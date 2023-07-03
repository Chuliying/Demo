import { request, gql } from "graphql-request";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT as string;

// get categories data
type Categories = {
  categories: [
    {
      name: string;
      slug: string;
      nameTw: string;
      categoryPic: {
        url: string;
      };
    }
  ];
};

export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        nameTw
        slug
        categoryPic {
          url
        }
      }
    }
  `;
  const result: Categories = await request(graphqlAPI, query);
  return result.categories;
};

// get category slug

interface CategoriesSlugs {
  categories: [{ slug: string }];
}

export const GetCategorySlugs = async () => {
  const query = gql`
    query GetCategorySlugs {
      categories {
        slug
      }
    }
  `;

  const result: CategoriesSlugs = await request(graphqlAPI, query);
  return result.categories;
};

// get categories posts
interface CategoriesPosts {
  category: {
    nameTw: string;
    name: string;
    works: [
      {
        localizations: [
          {
            title: string;
            slug: string;
            year: string;
            tags: [
              {
                name: string;
              }
            ];
            cover: {
              url: string;
            };
          }
        ];
      }
    ];
  };
}
export const GetCategoryPosts = async (slug: string) => {
  const query = gql`
    query GetCategoryPosts($slug: String!) {
      category(where: { slug: $slug }) {
        nameTw
        name
        works(orderBy: updatedAt_DESC,) {
          localizations(locales: [en, zh_TW], includeCurrent: true) {
            title
            slug
            year
            tags(forceParentLocale: true) {
              name
            }
            cover {
              url
            }
          }
        }
      }
    }
  `;

  const result: CategoriesPosts = await request(graphqlAPI, query, { slug });
  return result;
};

/////////////////////////////////////////

// get featured news
interface featuredPost {
  posts: [
    {
      localizations: [
        {
          name: string;
          slug: string;
        }
      ];
    }
  ];
}

export const getFeaturedPosts = async (locale: string) => {
  const query = gql`
    query GetFeaturedPosts($locale: Locale!) {
      posts(where: { featured: true }) {
        localizations(locales: [$locale], includeCurrent: true) {
          name
          slug
        }
      }
    }
  `;

  const result: featuredPost = await request(graphqlAPI, query, { locale });
  return result.posts;
};

//////////////////////////////////////////
// types //
interface NewsPosts {
  posts: [
    {
      localizations: [
        {
          name: string;
          slug: string;
          publishedAt: string;
        }
      ];
    }
  ];
}
interface NewsPost {
  post: {
    slug: string;
    cover?: {
      url?: string;
    };
    updatedAt: string;
  };
  localizations: [
    {
      name: string;
      work?: {
        slug: string;
        title: string;
      };
      content: {
        raw: any;
      };
    }
  ];
}
interface NewsSlug {
  posts: [
    {
      slug: string;
    }
  ];
}

// get News slug
export const getNewsPostSlug = async () => {
  const query = gql`
    query getNewsPosts {
      posts {
        slug
      }
    }
  `;

  const result: NewsSlug = await request(graphqlAPI, query);
  return result.posts;
};

// get News list last 5
export const getIndexNewsPosts = async () => {
  const query = gql`
    query getIndexNewsPosts {
      posts(orderBy: publishedAt_DESC, last: 5) {
        localizations(locales: [en, zh_TW], includeCurrent: true) {
          name
          slug
          publishedAt
        }
      }
    }
  `;
  const result: NewsPosts = await request(graphqlAPI, query);
  return result.posts;
};

// get News
export const getNewsPosts = async () => {
  const query = gql`
    query getIndexNewsPosts {
      posts(orderBy: publishedAt_DESC) {
        localizations(locales: [en, zh_TW], includeCurrent: true) {
          name
          slug
          publishedAt
        }
      }
    }
  `;
  const result: NewsPosts = await request(graphqlAPI, query);
  return result.posts;
};
// get News Post Detail
export const getNewsPostDetails = async (slug: string) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        cover {
          url
        }
        updatedAt
        slug
        localizations(includeCurrent: true, locales: [zh_TW, en]) {
          name
          work {
            slug
            title
          }
          content {
            raw
          }
        }
      }
    }
  `;
  const result: NewsPost = await request(graphqlAPI, query, { slug });
  return result.post;
};

//////////////////////////////////////////
// Work
interface WorksSlug {
  works: [
    {
      slug: string;
    }
  ];
}

interface Work {
  work: {
    slug: string;
    cover?: {
      url?: string;
    };
    updatedAt: string;
    category: {
      nameTw: string;
      name: string;
    };
    embededVideo: string;
    gallery: [
      {
        url: string;
      }
    ];

    localizations: [
      {
        credit?: string;
        title: string;
        tags?: [{ name: string }];
        info?: {
          raw: any;
        };
        content: {
          raw: any;
        };
        related?: {
          raw: any;
        };
      }
    ];
  };
}

// get Works slug
export const getWorksSlug = async () => {
  const query = gql`
    query getWorksSlug {
      works {
        slug
      }
    }
  `;

  const result: WorksSlug = await request(graphqlAPI, query);
  return result.works;
};

// get News Post Detail
export const getWorkDetails = async (slug: string) => {
  const query = gql`
    query getWorkDetail($slug: String!) {
      work(where: { slug: $slug }) {
        cover {
          url
        }
        category {
          nameTw
          name
        }
        updatedAt
        slug
        embededVideo
        gallery {
          url
        }
        localizations(includeCurrent: true, locales: [zh_TW, en]) {
          title
          credit
          info {
            raw
          }
          content {
            raw
          }
          tags {
            name
          }
          related {
            raw
          }
        }
      }
    }
  `;
  const result: Work = await request(graphqlAPI, query, { slug });
  return result.work;
};

interface Page {
  page: {
    cover: {
      url: string;
    };

    localizations: [
      {
        name: string;
        description: {
          raw: any;
        };
      }
    ];
  };
}

// get pages data
export const getPage = async (slug: string) => {
  const query = gql`
    query getPage($slug: String!) {
      page(where: { slug: $slug }) {
        cover {
          url
        }
        localizations(includeCurrent: true, locales: [zh_TW, en]) {
          name

          description {
            raw
          }
        }
      }
    }
  `;
  const result: Page = await request(graphqlAPI, query, { slug });
  return result.page;
};

// get members data
interface Members {
  members: [
    {
      photo: {
        url: string
      }
      localizations: [
        {
          name: string;
          title: string;
          description: string;
        }
      ];
    }
  ];
}
export const getMembers = async () => {
  const query = gql`
    query getMembers {
      members {
        photo{
          url
        }
        localizations(includeCurrent: true, locales: [zh_TW, en]) {
          name
          title
          description
        }
      }
    }
  `;
  const result: Members = await request(graphqlAPI, query);
  return result.members;
};

// co artist
interface CoArtists {
  coArtists: [
    {
      photo: {
        url: string
      }
      localizations: [
        {
          name: string;
          title?: string;
          description: string;
        }
      ];
    }
  ];
}
export const getCoArtists = async () => {
  const query = gql`
    query getCoArtists {
      coArtists {
        photo{
          url
        }
        localizations(includeCurrent: true, locales: [zh_TW, en]) {
          name
          description
        }
      }
    }
  `;
  const result: CoArtists = await request(graphqlAPI, query);
  return result.coArtists;
};

// get publication
interface Publications {
  publications: [
    {
      cover: {
        url: string
      }
      price: number
      localizations: [
        {
          name: string;
          description: string;
        }
      ];
    }
  ];
}
export const getPublications = async () => {
  const query = gql`
    query getCoArtists {
      publications {
        price
        cover{
          url
        }
        localizations(includeCurrent: true, locales: [zh_TW, en]) {
          name
          description
        }
      }
    }
  `;
  const result: Publications = await request(graphqlAPI, query);
  return result.publications;
};
