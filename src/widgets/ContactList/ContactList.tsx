import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'

import { type FC } from 'react'

import ButtonAdd from 'widgets/ButtonAdd/ButtonAdd'
import { Contact } from 'widgets/Contact/Contact'

export const ContactList: FC = (props) => {
  return (
    <TableContainer component={Paper} sx={{ background: '#111B21' }}>
      <Table aria-label='contacts table'>
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: '0.5px solid #404040' }}>
              <ButtonAdd />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <div style={{ height: '70vh', overflow: 'auto' }}>
            <Contact />
          </div>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
