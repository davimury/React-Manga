import { useQuery } from "@apollo/react-hooks";
import { AutoComplete, Tag, Tooltip } from "antd";
import gql from "graphql-tag";
import _ from "lodash";
import React, { useCallback, useState } from "react";

import graphqlClient from "../../api/graphql";
import Search from "../../antd/Search";
import MangaDetails from "./MangaDetails";
import "../../global.less";

const query = gql`
  query($searchTitle: String!) {
    mangas(searchTitle: $searchTitle) {
      id
      image
      status
      title
    }
  }
`;

const THROTTLE_TIME = 500;
const MIN_QUERY_LENGTH = 3;

const STATUS_TO_COLOR = {
  COMPLETED: "green",
  ONGOING: "blue",
  SUSPENDED: undefined
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedManga, setSelectedManga] = useState("");
  const { data, loading } = useQuery(query, {
    skip: searchQuery.length < MIN_QUERY_LENGTH,
    variables: { searchTitle: searchQuery }
  });

  const handleChange = useCallback(
    _.throttle(searchQuery => {
      setSearchQuery(searchQuery);
    }, THROTTLE_TIME),
    [setSearchQuery]
  );

  const dataSource =
    !loading &&
    data &&
    data.mangas &&
    data.mangas.map(manga => (
      <AutoComplete.Option
        key={manga.id}
        value={manga.title}
      >
        <span
          className="home-search-option"
          onClick={() => setSelectedManga(manga)}
        >
          <Tooltip
            mouseEnterDelay={0.5}
            placement="topLeft"
            title={manga.title}
          >
            <div
              className="home-search-option-title"
              title={manga.title}
            >
              {manga.title}
            </div>
          </Tooltip>
          <Tag
            className="home-search-option-status"
            color={STATUS_TO_COLOR[manga.status]}
          >
            {manga.status}
          </Tag>
        </span>
      </AutoComplete.Option>
    ));

  return (
    <div className="main-search-container">
      <Search
        dataSource={dataSource}
        onChange={handleChange}
      />
      {selectedManga && (
        <MangaDetails manga={selectedManga} />
      )}
    </div>
  );
};

export default Home;
