import 'server-only';
import { EDaysOfWeek } from '@/types/enums/days-of-week';

import type { Metadata } from 'next';
import moment from 'moment/moment';
import logo from '@/app/logo.svg';

export function userHelperHook() {
  
  const fetchGiphy = (id: string = 'random') => {
    return fetch(`https://api.giphy.com/v1/gifs/${id}?${decodeURIComponent(new URLSearchParams({
      api_key: process.env.GIPHY_API_KEY as string,
      rating: process.env.GIPHY_RATING as string,
      tag: (moment().day() === 5 ? process.env.GIPHY_TAG_IS_FRIDAY as string : process.env.GIPHY_TAG_IS_NOT_FRIDAY as string),
    }).toString())}`, { cache: 'no-store' }).then(r => r.json());
  };
  
  const metadata = async (id?: string): Promise<Metadata> => {
    const giphy = await fetchGiphy(id);
    const description = 'Vinerea este în mod tradițional a cincea zi a săptămânii (pentru țările în care săptămâna începe lunea), care cade între zilele de joi și sâmbătă. Etimologie: Veneris dies (l.lat.) = Ziua zeiței Venus.';
    
    return {
      title: 'Îi vineri?',
      description: EDaysOfWeek[moment().day()],
      applicationName: 'Îi vineri?',
      themeColor: 'black',
      colorScheme: 'dark',
      creator: 'MD Prodacșăn',
      robots: { follow: true, index: true },
      icons: logo,
      openGraph: {
        images: [giphy?.data?.images?.downsized_large?.url || logo.src],
        description,
      },
      twitter: {
        images: [giphy?.data?.images?.downsized_large?.url || logo.src],
        description,
      },
      keywords: [
        'ii vineri', 'iivineri', 'vineri', 'iivineri gif',
      ],
    };
  };
  
  return { metadata, fetchGiphy };
}
