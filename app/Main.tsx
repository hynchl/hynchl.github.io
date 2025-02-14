import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
// import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 10000

function formatNames(names) {
  if (names.length === 0) return ''
  if (names.length === 1) return names[0]
  if (names.length === 2) return names.join(' and ')

  return names.slice(0, -1).join(', ') + ', and ' + names[names.length - 1]
}

function SectionHeader({ children }) {
  return <h2 className="sticky top-0 pt-1 text-xl">{children}</h2>
}

function BodyText({ children }) {
  return (
    <div className="text-gray-500 transition-all duration-100 ease-out hover:text-gray-200">
      {children}
    </div>
  )
}

function PaperItem(post) {
  const { slug, venue, authors, link, memo, video, title, summary } = post
  return (
    <li key={slug} className="py-6">
      <article>
        <div className="space-y-1">
          {/* <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </dd>
          </dl> */}
          <div>
            <div className="space-y-1">
              <div>
                <h2 className="">
                  <span className="font-bold">
                    {title}, {formatNames(authors)}, {venue}
                  </span>
                  <span>{memo ? ' ' + memo : ''}</span>
                </h2>
                <p>
                  {link ? (
                    <Link
                      className="animate-shaking rounded-sm p-0.5 leading-8 tracking-tight text-gray-400 hover:bg-green-600 hover:text-black"
                      href={link}
                    >
                      {' '}
                      [link]{' '}
                    </Link>
                  ) : null}
                  {video ? (
                    <Link
                      className="animate-shaking rounded-sm p-0.5 leading-8 tracking-tight text-gray-400 hover:bg-green-600 hover:text-black"
                      href={video}
                    >
                      {' '}
                      [video]{' '}
                    </Link>
                  ) : null}
                </p>

                {/* <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div> */}
              </div>
              <BodyText>{summary}</BodyText>
            </div>
            {/* <div className="text-base font-medium leading-6">
              <Link
                href={`/blog/${slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read more: "${title}"`}
              >
                Read more &rarr;
              </Link>
            </div> */}
          </div>
        </div>
      </article>
    </li>
  )
}

function PosterDemoItem(post) {
  const { slug, venue, authors, link, video, award, title, summary } = post
  return (
    <li key={slug} className="py-6">
      <article>
        <div className="space-y-1">
          {/* <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </dd>
          </dl> */}
          <div>
            <div className="space-y-1">
              <div>
                <h2 className="">
                  <span className="font-bold">
                    {title}, {formatNames(authors)}, {venue}
                  </span>
                  <span className="text-primary-300">{award ? ' ' + award : ''}</span>
                </h2>

                {/* <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div> */}
                <p>
                  {link ? (
                    <Link
                      className="rounded-sm p-0.5 leading-8 tracking-tight text-gray-400 hover:bg-green-600 hover:text-black"
                      href={link}
                    >
                      {' '}
                      [link]{' '}
                    </Link>
                  ) : null}
                  {video ? (
                    <Link
                      className="animate-shaking rounded-sm p-0.5 leading-8 tracking-tight text-gray-400 hover:bg-green-600 hover:text-black"
                      href={video}
                    >
                      {' '}
                      [video]{' '}
                    </Link>
                  ) : null}
                </p>
              </div>

              {/* <BodyText>{summary}</BodyText> */}
            </div>
            {/* <div className="text-base font-medium leading-6">
              <Link
                href={`/blog/${slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read more: "${title}"`}
              >
                Read more &rarr;
              </Link>
            </div> */}
          </div>
        </div>
      </article>
    </li>
  )
}

function PresentationItem(post) {
  const { slug, venue, authors, memo, award, title, summary } = post
  return (
    <li key={slug} className="py-6">
      <article>
        <div className="space-y-1">
          {/* <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </dd>
          </dl> */}
          <div>
            <div className="space-y-1">
              <div>
                <h2 className="">
                  <span className="font-bold">
                    {title}, {formatNames(authors)}, {venue}
                  </span>
                  <span>{memo ? ' ' + memo : ''}</span>
                  <span className="text-primary-300">{award ? ' ' + award : ''}</span>
                </h2>

                {/* <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div> */}
              </div>
              {/* <BodyText>{summary}</BodyText> */}
            </div>
            {/* <div className="text-base font-medium leading-6">
              <Link
                href={`/blog/${slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read more: "${title}"`}
              >
                Read more &rarr;
              </Link>
            </div> */}
          </div>
        </div>
      </article>
    </li>
  )
}

function UnpublishedItem(post) {
  const { slug, venue, authors, collaboration, link, video, award, title, summary } = post
  return (
    <li key={slug} className="py-6">
      <article>
        <div className="space-y-1">
          {/* <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </dd>
          </dl> */}
          <div>
            <div className="space-y-1">
              <div>
                <h2 className="">
                  <span className="font-bold">
                    {title}
                    <br />
                    {/* {authors?formatNames(authors):null},{' '} */}
                    Collaboration with {collaboration ? formatNames(collaboration) : null}
                  </span>
                </h2>

                {/* <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div> */}
                <p>
                  {link ? (
                    <Link
                      className="rounded-sm p-0.5 leading-8 tracking-tight text-gray-400 hover:bg-green-600 hover:text-black"
                      href={link}
                    >
                      {' '}
                      [link]{' '}
                    </Link>
                  ) : null}
                  {video ? (
                    <Link
                      className="animate-shaking rounded-sm p-0.5 leading-8 tracking-tight text-gray-400 hover:bg-green-600 hover:text-black"
                      href={video}
                    >
                      {' '}
                      [video]{' '}
                    </Link>
                  ) : null}
                </p>
              </div>
              {/* <BodyText>{summary}</BodyText> */}
            </div>
            {/* <div className="text-base font-medium leading-6">
              <Link
                href={`/blog/${slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read more: "${title}"`}
              >
                Read more &rarr;
              </Link>
            </div> */}
          </div>
        </div>
      </article>
    </li>
  )
}

function ArtworkItem(post) {
  const {
    slug,
    exhibition,
    start,
    end,
    gallery,
    city,
    authors,
    collaboration,
    award,
    link,
    video,
    title,
    summary,
  } = post
  return (
    <li key={slug} className="py-6">
      <article>
        <div className="space-y-1">
          {/* <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </dd>
          </dl> */}
          <div>
            <div className="space-y-1">
              <div>
                <h2 className="">
                  <span className="font-bold">
                    {title}
                    {', '}
                    {exhibition}
                    {', '}
                    {gallery == '' ? '' : gallery + ', '}
                    {city}
                    {', '}
                    <time dateTime={start}>{formatDate(start, siteMetadata.locale)}</time> {' - '}
                    <time dateTime={end}>{formatDate(end, siteMetadata.locale)}</time>
                    <br />
                    {/* {authors?formatNames(authors):null},{' '} */}
                    {collaboration ? 'Collaboration with ' + formatNames(collaboration) : null}
                  </span>
                  <p>
                    {link ? (
                      <Link
                        className="rounded-sm p-0.5 leading-8 tracking-tight text-gray-400 hover:bg-green-600 hover:text-black"
                        href={link}
                      >
                        {' '}
                        [link]{' '}
                      </Link>
                    ) : null}
                    {video ? (
                      <Link
                        className="animate-shaking rounded-sm p-0.5 leading-8 tracking-tight text-gray-400 hover:bg-green-600 hover:text-black"
                        href={video}
                      >
                        {' '}
                        [video]{' '}
                      </Link>
                    ) : null}
                  </p>
                </h2>

                {/* <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div> */}
              </div>
              {/* <BodyText>{summary}</BodyText> */}
            </div>
            {/* <div className="text-base font-medium leading-6">
              <Link
                href={`/blog/${slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read more: "${title}"`}
              >
                Read more &rarr;
              </Link>
            </div> */}
          </div>
        </div>
      </article>
    </li>
  )
}

function TechnicalItem(post) {
  const {
    slug,
    exhibition,
    artist,
    role,
    start,
    end,
    gallery,
    city,
    authors,
    collaboration,
    award,
    title,
    summary,
  } = post
  return (
    <li key={slug} className="py-6">
      <article>
        <div className="space-y-1">
          {/* <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </dd>
          </dl> */}
          <div>
            <div className="space-y-1">
              <div>
                <h2 className="">
                  <span className="font-bold">
                    {title}
                    {', '}
                    {artist}
                    {', '}
                    {exhibition}
                    {', '}
                    {gallery == '' ? '' : gallery + ', '}
                    {city}
                    {', '}
                    <time dateTime={start}>{formatDate(start, siteMetadata.locale)}</time> {' - '}
                    <time dateTime={end}>{formatDate(end, siteMetadata.locale)}</time>
                    <br />
                    {/* {authors?formatNames(authors):null},{' '} */}
                    {/* Collaboration with {collaboration ? formatNames(collaboration) : null} */}
                  </span>
                </h2>

                {/* <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div> */}
              </div>
              <BodyText>{role}</BodyText>
            </div>
            {/* <div className="text-base font-medium leading-6">
              <Link
                href={`/blog/${slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read more: "${title}"`}
              >
                Read more &rarr;
              </Link>
            </div> */}
          </div>
        </div>
      </article>
    </li>
  )
}

function OtherItem(post) {
  const { slug, category, collaboration, link, video, title, summary } = post
  return (
    <li key={slug} className="py-6">
      <article>
        <div className="space-y-1">
          {/* <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            </dd>
          </dl> */}
          <div>
            <div className="space-y-1">
              <div>
                <h2 className="">
                  <span className="font-bold">
                    {title}, {category}
                    <br />
                    {/* {authors?formatNames(authors):null},{' '} */}
                    {collaboration ? 'Collaboration with ' + formatNames(collaboration) : null}
                  </span>
                </h2>

                {/* <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div> */}
                <p>
                  {link ? (
                    <Link
                      className="rounded-sm p-0.5 leading-8 tracking-tight text-gray-400 hover:bg-green-600 hover:text-black"
                      href={link}
                    >
                      {' '}
                      [link]{' '}
                    </Link>
                  ) : null}
                  {video ? (
                    <Link
                      className="animate-shaking rounded-sm p-0.5 leading-8 tracking-tight text-gray-400 hover:bg-green-600 hover:text-black"
                      href={video}
                    >
                      {' '}
                      [video]{' '}
                    </Link>
                  ) : null}
                </p>
              </div>
              {/* <BodyText>{summary}</BodyText> */}
            </div>
            {/* <div className="text-base font-medium leading-6">
              <Link
                href={`/blog/${slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read more: "${title}"`}
              >
                Read more &rarr;
              </Link>
            </div> */}
          </div>
        </div>
      </article>
    </li>
  )
}

export default function Home({
  papers,
  posterdemos,
  presentations,
  unpublished,
  artworks,
  technicals,
  others,
}) {
  return (
    <>
      <div className="mb-0 space-y-2 pb-0 pr-4 pt-4 text-sm lowercase tracking-tight text-black dark:text-gray-100 md:space-y-8">
        <h1 className="sticky top-0 w-14 pt-2 font-black xl:w-28">{siteMetadata.title} </h1>
        <p>{siteMetadata.description}</p>
        <p>
          <Link href="https://docs.google.com/document/d/1WFXyfm1MaXvMnvt22WxjTEFSI5Q9_H6R_vDjJCU6Yyw/edit?usp=sharing">
            [CV]
          </Link>
        </p>

        <div className="pl-20 xl:pl-32">
          <SectionHeader> Papers </SectionHeader>
          <ul className="dark:text-gray-100">
            {!papers.length && 'No papers found.'}
            {papers.slice(0, MAX_DISPLAY).map((post) => {
              return PaperItem(post)
            })}
          </ul>
        </div>

        <div className="pl-20 xl:pl-32">
          <SectionHeader> Posters & Demos </SectionHeader>
          <ul className=" dark:text-gray-100">
            {!posterdemos.length && 'No papers found.'}
            {posterdemos.slice(0, MAX_DISPLAY).map((post) => {
              return PosterDemoItem(post)
            })}
          </ul>
        </div>
        <div className="pl-20 xl:pl-32">
          <SectionHeader> Presentations </SectionHeader>
          <ul className=" dark:text-gray-100">
            {!presentations.length && 'No papers found.'}
            {presentations.slice(0, MAX_DISPLAY).map((post) => {
              return PresentationItem(post)
            })}
          </ul>
        </div>
        <div className="pl-20 xl:pl-32">
          <SectionHeader> Unpublished Works </SectionHeader>
          <ul className=" dark:text-gray-100">
            {!unpublished.length && 'No papers found.'}
            {unpublished.slice(0, MAX_DISPLAY).map((post) => {
              return UnpublishedItem(post)
            })}
          </ul>
        </div>
        <div className="pl-20 xl:pl-32">
          <SectionHeader> Artworks </SectionHeader>
          <ul className=" dark:text-gray-100">
            {!artworks.length && 'No papers found.'}
            {artworks.slice(0, MAX_DISPLAY).map((post) => {
              return ArtworkItem(post)
            })}
          </ul>
        </div>
        <div className="pl-20 xl:pl-32">
          <SectionHeader> Technical Contributions for Artworks </SectionHeader>
          <ul className=" dark:text-gray-100">
            {!technicals.length && 'No papers found.'}
            {technicals.slice(0, MAX_DISPLAY).map((post) => {
              return TechnicalItem(post)
            })}
          </ul>
        </div>
        <div className="pl-20 xl:pl-32">
          <SectionHeader> Others </SectionHeader>
          <ul className=" dark:text-gray-100">
            {!others.length && 'No papers found.'}
            {others.slice(0, MAX_DISPLAY).map((post) => {
              return OtherItem(post)
            })}
          </ul>
        </div>

        <div>
          <div className="h-64"></div>
          <div className="sticky bottom-8">
            <h1 className="w-14 pt-2 font-black xl:w-28">contact </h1>
            <ul className="">
              <li>
                {' '}
                mail: <a href="mailto:hyunchul.kim@kaist.ac.kr">hyunchul.kim@kaist.ac.kr</a> or{' '}
                <a href="mailto:mail@hyunchul.kim">mail@hyunchul.kim </a>
              </li>
              <li> linkedin: www.linkedin.com/in/hynchl </li>
              <li> instagram: hynchl </li>
              <li> twitter: kimhynchl </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
