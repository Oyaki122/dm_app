
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '.';

import React from 'react';

export function ScheduleTableRow({element}:{element: string[]}) {
  return <Tr>
    {element.map((e, i) => <Td key={i}>{e}</Td>)}
  </Tr>;
}
export function ScheduleTable({indexes, children}:{indexes: string[], children?: React.ReactNode}) {
  return <>
    <TableContainer>
      <Table variant="simple" colorScheme="gray">
        <Thead>
          <Tr>
            {indexes.map((e, i) => <Th key={i}>{e}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {children}
        </Tbody>

      </Table>
    </TableContainer>
  </>;
}

