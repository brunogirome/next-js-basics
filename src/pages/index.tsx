import { GetServerSideProps } from "next";
import { Title } from "../styles/pages/Home";
import SEO from '../components/SEO';
import { title } from "process";

interface IProduct {
  id: number;
  title: string;
}

interface IHomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: IHomeProps) {

  async function handleSum() {
    const { default: math } = await import ('@/lib/math');

    alert(math.sum(13, 5));
  }

  return (
    <div>
      <SEO 
        title='Nice page, bro'
        image='image.jpeg'
        shouldExcludeTitleSuffix 
      />

      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((recommendedProduct) => {
            return (
              <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
            );
          })}
        </ul>
      </section>

      <button onClick={handleSum}>Sum</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);

  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
