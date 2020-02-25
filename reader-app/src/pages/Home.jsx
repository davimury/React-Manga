import { useQuery } from "@apollo/react-hooks";
import { AutoComplete, Tag, Tooltip } from "antd";
import gql from "graphql-tag";
import _ from "lodash";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import graphqlClient from "../api/graphql";
import Search from "../antd/Search";
import "../global.less";

const query = gql`
  query($searchTitle: String!) {
    mangas(searchTitle: $searchTitle) {
      id
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

const sanitiseTitle = title =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-{2,}/g, "-");

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
        <Link
          className="home-search-option"
          to={`${manga.id}-${sanitiseTitle(manga.title)}`}
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
        </Link>
      </AutoComplete.Option>
    ));

  return (
    <div className="main-search-container">
      <Search
        dataSource={dataSource}
        onChange={handleChange}
      />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default Home;
