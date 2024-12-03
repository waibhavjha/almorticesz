'use client'
const navigation = [
  { name: 'Home', href: '#' },
  { name: 'Blog', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
]
export const Hero = () => {
    return(
        <div className="bg-yellow-50">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Almorticesz</span>
              <img
  alt=""
  src="/almorticesz.jpg"
  className="h-16 w-auto shadow-[0_0_15px_5px_rgba(255,255,255,0.8)]"
/>

            </a>
          </div>
          <div className="flex lg:hidden">
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end">
            <a
  href="/login"
  className="text-sm/6 font-semibold text-gray-900 transition-transform duration-200 active:scale-95"
>
  Log in <span aria-hidden="true">&rarr;</span>
</a>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-20 lg:py-24">
        <div className="flex justify-center mb-8">
  <div className="relative w-[90%] sm:w-auto rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
    Become financially free by embracing these principles to financial freedom.{' '}
    <a href="/report" className="font-semibold text-orange-400">
      <span aria-hidden="true" className="absolute inset-0" />
      Read more <span aria-hidden="true">&rarr;</span>
    </a>
  </div>
</div>


          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-600 sm:text-7xl">
              ALMORTICESZ
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-600 sm:text-xl/8">
            Achieve financial independence by these proven principles. Discover strategies to create sustainable wealth.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/report"
                className="rounded-md bg-orange-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-transform duration-200 active:scale-95"
              >
                Get started
              </a>
              <a href="/report" className="text-sm/6 font-semibold text-gray-900 transition-transform duration-200 active:scale-95">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };
  