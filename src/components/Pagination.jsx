import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

const PaginationComponent = ({handleChang, currentPage, numberOfPage}) => {

    return (
        <div>
            <Stack spacing={2}>
                <Pagination
                    page={Number(currentPage)}
                    onChange={handleChang}
                    count={Number(numberOfPage)}
                    variant="outlined"
                    shape="rounded" />
            </Stack>
        </div>
    )
}

export default PaginationComponent
