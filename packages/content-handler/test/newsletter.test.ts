import { expect } from 'chai'
import { SubstackHandler } from '../src/substack-handler'
import { AxiosHandler } from '../src/axios-handler'
import { BloombergHandler } from '../src/bloomberg-handler'
import { GolangHandler } from '../src/golang-handler'
import { MorningBrewHandler } from '../src/morning-brew-handler'

describe('Newsletter email test', () => {
  describe('#getNewsletterUrl()', () => {
    it('returns url when email is from SubStack', () => {
      const rawUrl = '<https://hongbo130.substack.com/p/tldr>'

      expect(new SubstackHandler().parseNewsletterUrl(rawUrl, '')).to.equal(
        'https://hongbo130.substack.com/p/tldr'
      )
    })

    it('returns url when email is from Axios', () => {
      const url = 'https://axios.com/blog/the-best-way-to-build-a-web-app'
      const html = `View in browser at <a>${url}</a>`

      expect(new AxiosHandler().parseNewsletterUrl('', html)).to.equal(url)
    })

    it('returns url when email is from Bloomberg', () => {
      const url = 'https://www.bloomberg.com/news/google-is-now-a-partner'
      const html = `
        <a class="view-in-browser__url" href="${url}">
        View in browser
        </a>
      `

      expect(new BloombergHandler().parseNewsletterUrl('', html)).to.equal(url)
    })

    it('returns url when email is from Golang Weekly', () => {
      const url = 'https://www.golangweekly.com/first'
      const html = `
        <a href="${url}" style="text-decoration: none">Read on the Web</a>
      `

      expect(new GolangHandler().parseNewsletterUrl('', html)).to.equal(url)
    })

    it('returns url when email is from Morning Brew', () => {
      const url = 'https://www.morningbrew.com/daily/issues/first'
      const html = `
        <a style="color: #000000; text-decoration: none;" target="_blank" rel="noopener" href="${url}">View Online</a>
      `

      expect(new MorningBrewHandler().parseNewsletterUrl('', html)).to.equal(
        url
      )
    })
  })

  describe('get author from email address', () => {
    it('returns author when email is from Substack', () => {
      const from = 'Jackson Harper from Omnivore App <jacksonh@substack.com>'
      expect(new AxiosHandler().parseAuthor(from)).to.equal(
        'Jackson Harper from Omnivore App'
      )
    })

    it('returns author when email is from Axios', () => {
      const from = 'Mike Allen <mike@axios.com>'
      expect(new AxiosHandler().parseAuthor(from)).to.equal('Mike Allen')
    })
  })
})
