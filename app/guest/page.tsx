"use client"

import { useState, useEffect } from "react"
import { ModeToggle } from "@/app/dark-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function Guest() {
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const wait = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await wait(300);

    try {
      const res = await fetch("https://cf588464.cloudfree.jp/blog/auth.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        credentials: 'include',
      });

      if (res.status === 200) {
        toast({
          title: "ログイン成功",
          description: "ゲストエリアにアクセスできます。",
        });
        await wait(500);
        // window.location.href = "/list";
      } else if (res.status === 401) {
        throw new Error("パスワードが違います。");
      } else {
        throw new Error("ログインに失敗しました。");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "エラー",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const auth = async () => {
      try {
        const res = await fetch("https://cf588464.cloudfree.jp/blog/authcheck.php", {
          method: "GET",
          credentials: 'include',
        });
  
        if (res.status === 200) {
          toast({
            title: "ログイン済み",
            description: "ゲストエリアにアクセスできます。",
          });
          await wait(1000);
          window.location.href = "/list";
        }
      } catch (error) {
      }
    }
    auth()
  })

  return (
    <main className="h-[calc(100dvh)] w-screen flex justify-center items-center relative overflow-hidden bg-gradient-to-br from-background to-muted">
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>

      <Card className="w-[350px] z-10 shadow-xl bg-card/80 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">ゲストエリア</CardTitle>
          <CardDescription>パスワードを入力してください</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">パスワード</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ fontSize: '16px' }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" disabled={isLoading}>キャンセル</Button>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ログイン中...
              </>
            ) : (
              "ログイン"
            )}
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}