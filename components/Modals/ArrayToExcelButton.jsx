import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import DownloadIcon from '@mui/icons-material/Download';
import { arrayToExcel } from './ArrayToExcel';
import cloneDeep from 'lodash.clonedeep';

const ArrayToExcelButton = ({ apiArray, fileName, buttonTitle }) => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [columnsType, setColumnsType] = useState('1');
  const [selectedColumns, setSelectedColumns] = useState([]);

  const totalColumns = apiArray ? Object.keys(apiArray[0]).length : '';

  const updateSelectedColumns = (e, column) => {
    if (e.target.checked) {
      setSelectedColumns([...selectedColumns, column]);
    } else {
      setSelectedColumns(selectedColumns.filter((value) => value !== column));
    }
  };

  const apiArrayToExcel = () => {
    if (columnsType === '1') {
      arrayToExcel.convertArrayToTable(apiArray, fileName);
    } else {
      const customArray = cloneDeep(apiArray);
      customArray.map((obj) =>
        Object.keys(obj).forEach((key) => {
          if (!selectedColumns.includes(key)) {
            delete obj[key];
          }
        })
      );
      arrayToExcel.convertArrayToTable(customArray, fileName);
      setSelectedColumns([]);
    }
  };

  return (
    <>
      {apiArray.length > 0 && apiArray !== undefined && (
        <>
          <Button
            startIcon={<DownloadIcon />}
            variant="contained"
            color="primary"
            onClick={() => setShowDownloadModal(true)}
          >
            {buttonTitle}
          </Button>
          {showDownloadModal && (
            <Modal open={showDownloadModal} onClose={() => setShowDownloadModal(false)}>
              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  {buttonTitle}
                </Typography>
                <FormControl sx={{ marginBottom: '10px' }}>
                  <Typography>Select Download Type:</Typography>
                  <Select value={columnsType} onChange={(e) => setColumnsType(e.target.value)}>
                    <MenuItem value="1">All Columns({totalColumns})</MenuItem>
                    <MenuItem value="2">Custom</MenuItem>
                  </Select>
                </FormControl>
                {columnsType === '1' && (
                  <Typography sx={{ marginTop: '20px' }}>
                    {Object.keys(apiArray[0]).map((key, index) => {
                      return <span key={index}>{key}, </span>;
                    })}
                  </Typography>
                )}
                {columnsType === '2' && (
                  <div sx={{ display: 'flex', flexWrap: 'wrap', width: '100%', marginTop: '20px' }}>
                    {Object.keys(apiArray[0]).map((key, index) => {
                      return (
                        <div key={index} sx={{ display: 'flex', alignItems: 'center', width: '33.3%' }}>
                          <FormControlLabel
                            control={<Checkbox checked={selectedColumns.includes(key)} onChange={(e) => updateSelectedColumns(e, key)} />}
                            label={key}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
                <Button
                  variant="contained"
                  color="default"
                  onClick={() => setShowDownloadModal(false)}
                  sx={{ marginRight: 2 }}
                >
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={() => apiArrayToExcel()}>
                  Download
                </Button>
              </Box>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default ArrayToExcelButton;
