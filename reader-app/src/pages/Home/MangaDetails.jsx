import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { List, Spin } from "antd";
import html_entity_decode from "locutus/php/strings/html_entity_decode";
import { Link } from "react-router-dom";

const query = gql`
  query($mangaId: ID!) {
    manga(id: $mangaId) {
      id
      info {
        chapters {
          id
          title
        }
        description
      }
    }
  }
`;

const sanitiseTitle = title =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-{2,}/g, "-");

const MangaDetails = ({ manga }) => {
  const { data, loading } = useQuery(query, {
    variables: { mangaId: manga.id }
  });

  if (loading) return <Spin />;
  return (
    <div className="manga-details-wrapper">
      <img
        className="manga-details-image"
        referrerPolicy="no-referrer"
        src={manga.image}
      />
      <div className="manga-details-info">
        <p>
          {html_entity_decode(data.manga.info.description)}
        </p>
        <List
          size="small"
          bordered
          dataSource={data.manga.info.chapters}
          renderItem={(chapters, index) => (
            <List.Item>
              <Link
                to={
                  "/" +
                  manga.id +
                  "-" +
                  sanitiseTitle(manga.title) +
                  "/" +
                  chapters.id
                }
              >
                #
                {String(
                  data.manga.info.chapters.length - index
                ).padStart(
                  data.manga.info.chapters.length.toString()
                    .length,
                  "0"
                )}{" "}
                - {chapters.title}
              </Link>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default MangaDetails;
