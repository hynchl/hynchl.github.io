'use client'

import { useState, type ReactNode } from 'react'

function NewsLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="rounded-sm text-yellow-200 hover:bg-yellow-400 hover:text-black">
      {children}
    </a>
  )
}

export default function News() {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <ul className="pb-2">
        • Will exhibit <i>Pal Podcast</i> with Yunha Yeo, Bowon Kim, and Jungsoo Lee as the
        collective <NewsLink href="https://palimpsest.technology">Palimpsest Technology</NewsLink>{' '}
        at <NewsLink href="https://forkingroom.kr">ForkingRoom</NewsLink> (April 15–19, 2026) in
        Seoul, South Korea.
      </ul>
      <ul className="pb-2">
        • Demonstrated <i>Situately</i>, an embodied conversational agent system featuring
        LLM-powered nonverbal behavior control, with Kwangbin Lee, Jungsoo Lee, Sihyun Jeong, Prof.
        Sung-Hee Lee, and Porf. Jeongmi Lee at IEEE VR (March 23–25, 2026) in Daegu, South Korea.
      </ul>
      <ul className="pb-2">
        • Participated in the Uncomputable workshop led by Taeyoon Choi at Forever Gallery. We read
        "Uncomputable: Play and Politics in the Long Digital Age" and created a piece of artwork,{' '}
        <i>Dear Sam</i>, a letter to Sam Altman (OpenAI CEO).
        <br />
        <span className="ml-4">
          <NewsLink href="https://forevergallery.org/foreverworkshop/">
            [online exhibition]
          </NewsLink>
          ,{' '}
          <NewsLink href="https://hyunchul.kim/dear-sam/index.html">
            [<i>Dear Sam</i>]
          </NewsLink>
        </span>
      </ul>
      <ul className="pb-2">
        • <i>WriteHere</i>, led by Jaeryung Chung, a project I contributed to as an Apple Vision Pro
        application developer, won the iF Design Award 2026! <br />
        <span className="ml-4">
          <NewsLink href="https://creativitysupport.github.io/">[project page]</NewsLink>
        </span>
      </ul>
      <ul className="pb-2">
        • Ran the <strong>Seoul Marathon</strong> (March 15, 2026) and finished in 3:49:56.
      </ul>
      <ul className="pb-2">
        • Presented at the Annual Conference of the KSCBP 2025 (January 21–23, 2026) on my ongoing
        research on embodied conversation agents.
      </ul>
      {expanded && (
        <>
          <ul className="pb-2">• ran 1,761 km in 2025.</ul>
          <ul className="pb-2">
            • Presented at ISMAR 2025 (October 8–11, 2025) in Daejeon, South Korea — both in the
            Doctoral Consortium and Poster sessions.
          </ul>
          <ul className="pb-2">
            • Attended UIST 2025 (September 28–October 1, 2025) in Busan, South Korea.
          </ul>
          <ul className="pb-2">• Completed my PhD proposal presentation (August 7, 2025).</ul>
          <ul className="pb-2">
            • Attended Summer School on{' '}
            <NewsLink href="https://cixschool2025.isir.upmc.fr/">
              Computational interaction summer school
            </NewsLink>{' '}
            in Paris, France!
          </ul>
          <ul className="pb-2">
            • Presented a full paper at CHI 2025 (April 28 – May 1, 2025) in Yokohama, Japan.
          </ul>
          <ul className="pb-2">
            • Gave a talk on large language models and online communities at Forkingroom 2025: Left
            Tech (April 16, 2025)
          </ul>
          <ul className="pb-2">
            • Ran the <strong>Seoul Marathon</strong> (March 16, 2025) and finished in 3:45:46.
          </ul>
        </>
      )}
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        {expanded ? '[hide]' : '[more]'}
      </button>
    </>
  )
}
