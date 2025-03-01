// ListView.js
import React from "react";
import PropTypes from "prop-types";
import CardList from "../CardList/CardList";
import CompactList from "../CompactList/CompactList";
import DetailedList from "../DetailedList/DetailedList";

const ListView = ({ viewMode, sortCriteria, sortDirection }) => {
  if (viewMode === "cards") {
    return <CardList sortCriteria={sortCriteria} sortDirection={sortDirection} />;
  } else if (viewMode === "compact") {
    return <CompactList sortCriteria={sortCriteria} sortDirection={sortDirection} />;
  } else if (viewMode === "detailed") {
    return <DetailedList sortCriteria={sortCriteria} sortDirection={sortDirection} />;
  } else {
    return null;
  }
};

ListView.propTypes = {
  viewMode: PropTypes.oneOf(["cards", "compact", "detailed"]).isRequired,
  sortCriteria: PropTypes.oneOf(["date", "alphabetical", "updateDate"]).isRequired,
  sortDirection: PropTypes.oneOf(["asc", "desc"]).isRequired,
};

export default ListView;
