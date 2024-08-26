export async function GET() {
    try {
        // 外部 URL からデータを取得
        const response = await fetch("http://nnnnnnn0090.starfree.jp/index.php");

        // レスポンスが成功でない場合、エラーメッセージを返す
        if (!response.ok) {
            return new Response(
                JSON.stringify({ error: "Failed to fetch data" }),
                { status: response.status, headers: { "Content-Type": "application/json" } }
            );
        }

        // レスポンスのデータをテキストとして取得
        const text = await response.text();

        // JSON レスポンスを返す
        return new Response(
            JSON.stringify({ content: text }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        // エラーハンドリング
        return new Response(
            JSON.stringify({ error: "An unexpected error occurred" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
