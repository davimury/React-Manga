import { useQuery } from "@apollo/react-hooks";
import { Spin } from "antd";
import React from "react";
import gql from "graphql-tag";

const query = gql`
  query($chapterId: ID!) {
    chapter(id: $chapterId) {
      id
      images {
        url
        width
        height
      }
    }
  }
`;

const MangaChapter = ({
  match: {
    params: { chapterId }
  }
}) => {
  const { data, loading } = useQuery(query, {
    variables: { chapterId }
  });

  if (loading) return <Spin />;

  return (
    <div className="manga-chapter-wrapper">
      {[...data.chapter.images]
        .reverse()
        .map((image, index) => (
          <div key={index}>
            <img
              referrerPolicy="no-referrer"
              src={image.url}
            />
          </div>
        ))}
    </div>
  );
};

export default MangaChapter;
