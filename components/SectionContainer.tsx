import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    // <section className="mx-auto max-w-2xl px-4 sm:px-6 xl:max-w-2xl xl:px-0">{children}</section>
    <section className="mr-2 max-w-2xl px-4 sm:px-6 xl:ml-6 xl:max-w-[45vw] xl:px-0">
      {children}
    </section>
  )
}
