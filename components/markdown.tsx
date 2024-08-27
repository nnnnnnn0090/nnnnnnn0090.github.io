import React from 'react';
import markdownToHtml from 'zenn-markdown-html';
import 'zenn-content-css'
import {useEffect} from "react";
import initTwitterScriptInner from "zenn-embed-elements/lib/init-twitter-script-inner";

type MarkdownRendererProps = {
  children: string;
};

export default async function MarkdownRenderer({ children: markdown }: MarkdownRendererProps) {
  useEffect(() => {
    import('zenn-embed-elements');
  }, []);
  
  const content = await markdownToHtml(markdown || '', {
    embedOrigin: "https://embed.zenn.studio",
  })

  return (
    <article className="mb-32 znc">
      <script
          dangerouslySetInnerHTML={{
            __html: initTwitterScriptInner
          }}
      />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}