import React from 'react'
import { Pane, majorScale } from 'evergreen-ui'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'
import orderby from 'lodash.orderby'
import Container from '../../components/container'
import HomeNav from '../../components/homeNav'
import PostPreview from '../../components/postPreview'
import { posts as postsFromCMS } from '../../content'

const Blog = ({ posts }) => {
  return (
    <Pane>
      <header>
        <HomeNav />
      </header>
      <main>
        <Container>
          {posts.map((post) => (
            <Pane key={post.title} marginY={majorScale(5)}>
              <PostPreview post={post} />
            </Pane>
          ))}
        </Container>
      </main>
    </Pane>
  )
}

Blog.defaultProps = {
  posts: [],
}
export function getStaticProps() {

  const cmsPosts = postsFromCMS.published.map(post => {
    const { data } = matter(post)
    return data
  })

  // const postDirectory = path.join(process.cwd(), 'posts')
  // const filenames = fs.readdirSync(postDirectory)
  // console.log('everything', filenames)
  // const filePosts = filenames.map(filename => {
  //   const filePath = path.join(postDirectory, filename)
  //   return fs.readFileSync(filePath, 'utf-8')
  // })

 const postsPath = path.join(process.cwd(), 'posts')
 const filenames = fs.readdirSync(postsPath)
 console.log('everything', filenames)
 const filePosts = filenames.map(name => {
  const filePath = path.join(process.cwd(), 'posts', name)
  const file = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(file)
  return data
 })

  // const posts = orderby(
  //   [...postsFromCMS.published, ...filePosts].map((content) => {
  //     const { data } = matter(content)
  //     return data
  //   }),
  //   ['publishedOn'],
  //   ['desc'],
  // )

  const posts = [ ...cmsPosts, ...filePosts]
  console.log('filePath plus', filePosts)
  return {
    props: { posts }
  }
}

export default Blog

/**
 * Need to get the posts from the
 * fs and our CMS
 */
