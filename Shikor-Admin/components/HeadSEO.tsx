import SITEMAP from "./SITEMAP"

const HeadSEO: React.FC = () => (
  <>
    <meta name='description' content='Whatever' />
    <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
    <link rel='icon' href='/favicon.ico' sizes='48x48' />
    <link rel='icon' href='/favicon.ico' sizes='32x32' />
    <link rel='icon' href='/favicon.ico' sizes='16x16' />
    <link rel='mask-icon' color='#DDDDDD' />
    <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
    <link rel='manifest' href='/manifest.json' />

    <meta name='robots' content='max-image-preview:large' />
    <meta property='og:locale' content='en_US' />
    <meta
      property='og:site_name'
      content='Rosetech Solutions Ltd. - Utilize technology in business'
    />
    <meta property='og:type' content='website' />
    <meta property='og:title' content='Rosetech Solutions Ltd.' />
    <meta
      property='og:description'
      content='Rosetech Solutions Ltd. - An innovative software firm established to provide high-quality IT services at affordable rates for upgrowing businesses in Bangladesh'
    />
    {/*  TODO: all page */}
    <meta property='og:url' content={`https://${SITEMAP.host}`} />
    <meta property='og:image' content={`https://${SITEMAP.host}/logo.png`} />
    <meta
      property='og:image:secure_url'
      content={`https://${SITEMAP.host}/logo.png`}
    />
    <meta property='og:image:width' content='300' />
    <meta property='og:image:height' content='300' />
    <meta name='twitter:card' content='summary' />
    <meta name='twitter:title' content='Rosetech Solutions Ltd.' />
    <meta
      name='twitter:description'
      content='Rosetech Solutions Ltd. - An innovative software firm established to provide high-quality IT services at affordable rates for upgrowing businesses in Bangladesh'
    />
    <meta name='twitter:image' content={`https://${SITEMAP.host}/logo.png`} />
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebSite',
              '@id': 'https://rosetech.dev/#website',
              'url': 'https://rosetech.dev/',
              'name': 'Rosetech Solutions Ltd.',
              'description':
                'Rosetech - An innovative software firm established to provide high-quality IT services at affordable rates for upgrowing businesses in Bangladesh',
              'inLanguage': 'en-US',
              'publisher': {
                '@id': 'https://rosetech.dev/#organization'
              },
              'potentialAction': {
                '@type': 'SearchAction',
                'target': {
                  '@type': 'EntryPoint',
                  'urlTemplate': 'https://rosetech.dev#{search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              }
            },
            {
              '@type': 'Organization',
              '@id': 'https://rosetech.dev/#organization',
              'name': 'Rosetech Solutions Ltd.',
              'url': 'https://rosetech.dev/',
              'logo': {
                '@type': 'ImageObject',
                '@id': 'https://rosetech.dev/#organizationLogo',
                'url': 'https://rosetech.dev/logo.png',
                'width': 300,
                'height': 300
              },
              'image': {
                '@id': 'https://rosetech.dev/#organizationLogo'
              },
              'sameAs': [
                'https://facebook.com/rosetechofficial',
                'https://linkedin.com/company/rosetechofficial'
              ],
              'contactPoint': {
                '@type': 'ContactPoint',
                'telephone': '+8801842546165',
                'contactType': 'Customer Support'
              }
            },
            {
              '@type': 'BreadcrumbList',
              '@id': 'https://rosetech.dev/#breadcrumblist',
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  '@id': 'https://rosetech.dev/#listItem',
                  'position': 1,
                  'item': {
                    '@type': 'WebPage',
                    '@id': 'https://rosetech.dev/',
                    'name': 'Home',
                    'description':
                      'Rosetech - An innovative software firm established to provide high-quality IT services at affordable rates for upgrowing businesses in Bangladesh',
                    'url': 'https://rosetech.dev/'
                  },
                  'nextItem': 'https://rosetech.dev/#listItem'
                },
                {
                  '@type': 'ListItem',
                  '@id': 'https://rosetech.dev/#listItem',
                  'position': 2,
                  'item': {
                    '@type': 'WebPage',
                    '@id': 'https://rosetech.dev/',
                    'name': 'Home Dark',
                    'description':
                      'Rosetech - An innovative software firm established to provide high-quality IT services at affordable rates for upgrowing businesses in Bangladesh',
                    'url': 'https://rosetech.dev/'
                  },
                  'previousItem': 'https://rosetech.dev/#listItem'
                }
              ]
            },
            {
              '@type': 'WebPage',
              '@id': 'https://rosetech.dev/#webpage',
              'url': 'https://rosetech.dev/',
              'name':
                'Rosetech Solutions Ltd. - Utilize technology in business',
              'description':
                'Rosetech - An innovative software firm established to provide high-quality IT services at affordable rates for upgrowing businesses in Bangladesh',
              'inLanguage': 'en-US',
              'isPartOf': {
                '@id': 'https://rosetech.dev/#website'
              },
              'breadcrumb': {
                '@id': 'https://rosetech.dev/#breadcrumblist'
              },
              'datePublished': '2021-09-06T13:42:18+00:00',
              'dateModified': '2022-09-21T13:35:06+00:00'
            }
          ]
        })
      }}
    />
  </>
)

export default HeadSEO
