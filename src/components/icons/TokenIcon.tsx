import Image from 'next/image';
import { memo } from 'react';
import { Token, TokenId } from 'src/config/tokens';
import CeloIcon from 'src/images/tokens/CELO.svg';
import cEURIcon from 'src/images/tokens/cEUR.svg';
import cREALIcon from 'src/images/tokens/cREAL.svg';
import cUSDIcon from 'src/images/tokens/cUSD.svg';

interface Props {
  token?: Token | null;
  size?: 'xs' | 's' | 'm' | 'l';
}

function _TokenIcon({ token, size = 'm' }: Props) {
  const { actualSize, fontSize } = sizeValues[size];

  if (!token) {
    return (
      <div
        className="flex items-center justify-center rounded-full border border-gray-200 bg-white"
        style={{
          width: actualSize,
          height: actualSize,
        }}
      ></div>
    );
  }

  let imgSrc;
  if (token?.id === TokenId.CELO) imgSrc = CeloIcon;
  else if (token?.id === TokenId.cUSD) imgSrc = cUSDIcon;
  else if (token?.id === TokenId.cEUR) imgSrc = cEURIcon;
  else if (token?.id === TokenId.cREAL) imgSrc = cREALIcon;

  if (imgSrc) {
    return (
      <Image
        src={imgSrc}
        alt="" // Not using real alt because it looks strange while loading
        width={actualSize}
        height={actualSize}
        priority={true}
      />
    );
  }

  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: actualSize,
        height: actualSize,
        backgroundColor: token.color || '#9CA4A9',
      }}
    >
      <div
        className="font-semibold text-white"
        style={{
          fontSize,
        }}
      >
        {token.symbol[0].toUpperCase()}
      </div>
    </div>
  );
}

const sizeValues = {
  xs: {
    actualSize: 22,
    fontSize: '13px',
  },
  s: {
    actualSize: 30,
    fontSize: '15px',
  },
  m: {
    actualSize: 40,
    fontSize: '18px',
  },
  l: {
    actualSize: 46,
    fontSize: '20px',
  },
};

export const TokenIcon = memo(_TokenIcon);
