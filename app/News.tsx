'use client'

import { useState } from 'react'

export default function News() {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <ul className="pb-2">
        • Will exhibit <i>Pal Podcast</i> with Yunha Yeo, Bowon Kim, and Jungsoo Lee as the
        collective Palimpsest Technology at ForkingRoom (April 15–19, 2026) in Seoul, South Korea.
      </ul>
      <ul className="pb-2">
        • demonstrated <i>Situately</i>, an embodied conversational agent system featuring
        LLM-powered nonverbal behavior control, with amazing collaborators at IEEE VR (March 23-25,
        2026) in Daegu, South Korea.
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
            <a href="https://cixschool2025.isir.upmc.fr/">
              Computational interaction summer school
            </a>{' '}
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
