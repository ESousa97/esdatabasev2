// ListView.js
import React from "react";
import PropTypes from "prop-types";
import CardList from "../CardList/CardList";
import CompactList from "../CompactList/CompactList";
import DetailedList from "../DetailedList/DetailedList";
import { Box } from '@mui/material';

const ListView = ({ viewMode, sortCriteria, sortDirection }) => {
  return (
    <Box sx={{ mt: { xs: 0, sm: 0.5 }, width: '100%' }}>
      {viewMode === "cards" && (
        <CardList sortCriteria={sortCriteria} sortDirection={sortDirection} />
      )}
      {viewMode === "compact" && (
        <CompactList sortCriteria={sortCriteria} sortDirection={sortDirection} />
      )}
      {viewMode === "detailed" && (
        <DetailedList sortCriteria={sortCriteria} sortDirection={sortDirection} />
      )}
    </Box>
  );
};

ListView.propTypes = {
  viewMode: PropTypes.oneOf(["cards", "compact", "detailed"]).isRequired,
  sortCriteria: PropTypes.oneOf(["date", "alphabetical", "updateDate"]).isRequired,
  sortDirection: PropTypes.oneOf(["asc", "desc"]).isRequired,
};

export default ListView;
