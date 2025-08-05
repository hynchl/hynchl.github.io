import Link from '@/components/Link'

export default function News() {
  return (
    <>
      <ul className="pb-2 pt-6">
        • My PhD proposal presentation will take place at 10 a.m. (KST) on August 7 in Room 2332,
        Laughlin Hall (N5, 3rd Floor), KAIST. Remote attendance is available via{' '}
        <Link
          className="animate-shaking rounded-sm p-0.5 leading-8 tracking-tight text-yellow-400 hover:bg-yellow-300 hover:text-black"
          href={'https://meet.google.com/czn-etan-qrb'}
        >
          {' '}
          [google meet]
        </Link>
        .
      </ul>
      <ul className="pb-2">
        • Attended Summer School on{' '}
        <a href="https://cixschool2025.isir.upmc.fr/">Computational Interaction Summer School</a> in
        Paris, France!
      </ul>
      <ul className="pb-2">• Attended CHI 2025 (April 28 – May 1, 2025) in Yokohama, Japan.</ul>
      <ul className="pb-2">
        • Gave a talk on large language models and online communities at Forkingroom 2025: Left Tech
        (April 16, 2025)
      </ul>
      <ul className="pb-2">
        • Ran the <strong>Seoul Marathon</strong> (March 16, 2025) and finished in 3:45:46.
      </ul>
    </>
  )
}
