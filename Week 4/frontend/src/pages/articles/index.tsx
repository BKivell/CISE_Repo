import { GetServerSideProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import axios from "axios";

const backendBaseUrl = process.env.REACT_APP_BACKEND_URL;

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
  evidence: string;
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers: { key: keyof ArticlesInterface; label: string }[] = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
  ];

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ArticlesProps> = async (_) => {
  try {
    console.log("Fetching articles...");
    const response = await axios.get(backendBaseUrl || "", { withCredentials: true });
    console.log("Response:", response.data);
  
    const articles = response.data;

    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);

    return {
      props: {
        articles: [],
      },
    };
  }
};

export default Articles;
