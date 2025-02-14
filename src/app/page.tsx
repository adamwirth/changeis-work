import Image from 'next/image';

interface DataItem {
  title: string; // e.g. "Et tempore quia illo."
  description: string; // e.g. "Quo a aliquam..."
  url: string; // e.g. "https://picsum.photos/380/480"
};

type ResponseData = DataItem[];

export default async function Home() {
  const WIDTH = 380;
  const url = `https://fakerapi.it/api/v1/images?_width=${WIDTH}`;

  const data = await fetch(url);
  let posts = await data.json();
  console.debug(posts);
  posts = (posts?.data || null) as ResponseData;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-4 items-center sm:items-start">
          {posts && posts.map((post: DataItem, index: number) => (
            <div key={index} className="flex">
              <Image
                // ?random=1..10 have been whitelisted in next.config.ts
                src={post.url + `?random=${index + 1}`}
                alt={post.title}
                width={WIDTH}
                height={480}
                // Load the first ones first please
                priority={index < 3}
              />
              <div className="relative pl-4">
                <h1 className="text-2xl font-bold">{post.title}</h1>
                <p>{post.description}</p>
              </div>
            </div>
          ))
            || <p>No posts found!</p>}
        </div>
      </main>
    </div>
  );
}
