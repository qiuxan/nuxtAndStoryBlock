import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
  content: ['./app/storyblok/**/*.vue'],
  plugins: [typography]
}
