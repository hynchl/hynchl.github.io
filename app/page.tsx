import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import {
  allPapers,
  allPosterDemos,
  allUnpublisheds,
  allArtworks,
  allTechnicals,
  allOthers,
  allPresentations,
} from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPapers = sortPosts(allPapers)
  const papers = allCoreContent(sortedPapers)

  const sortedPosterDemos = sortPosts(allPosterDemos)
  const posterDemos = allCoreContent(sortedPosterDemos)

  const sortedPresentations = sortPosts(allPresentations)
  const presentations = allCoreContent(sortedPresentations)

  const sortedUnpublished = sortPosts(allUnpublisheds)
  const unpublisheds = allCoreContent(sortedUnpublished)

  const sortedArtworks = sortPosts(allArtworks)
  const artworks = allCoreContent(sortedArtworks)

  const sortedTechnicals = sortPosts(allTechnicals)
  const technicals = allCoreContent(sortedTechnicals)

  const sortedOthers = sortPosts(allOthers)
  const others = allCoreContent(sortedOthers)

  return (
    <Main
      papers={papers}
      posterdemos={posterDemos}
      presentations={presentations}
      unpublished={unpublisheds}
      artworks={artworks}
      technicals={technicals}
      others={others}
    />
  )
}
