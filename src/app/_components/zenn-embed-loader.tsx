"use client";

import { useEffect } from "react";

/**
 * zenn-embed-elements をクライアントで読み込み、<embed-katex> 等の
 * カスタム要素を登録する。数式表示に必要。
 */
export function ZennEmbedLoader() {
  useEffect(() => {
    void import("zenn-embed-elements");
  }, []);
  return null;
}
