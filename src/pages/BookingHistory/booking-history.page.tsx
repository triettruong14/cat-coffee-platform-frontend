import {
  Button,
  Col,
  DatePicker,
  Row,
  Select,
  Space,
  Table,
  TableProps,
} from 'antd';
import Title from 'antd/es/typography/Title';
import dayjs from 'dayjs';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  Booking,
  getBookingByAccountIdThunk,
  selectBookingHistory,
  selectUser,
} from '../../redux';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const HistoryContainer = styled.div`
  width: 80%;
  height: 50%;
  background: #fff;
  padding: 1rem;
`;

const PageTitle = styled(Title)`
  padding-block: 2.5rem;
`;

const columns: TableProps<Booking>['columns'] = [
  {
    title: 'Shop',
    dataIndex: 'shopName',
    key: 'shopName',
  },
  {
    title: 'Booking Date',
    dataIndex: 'bookingDate',
    key: 'bookingDate',
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Table number',
    dataIndex: 'tableId',
    key: 'tableId',
  },
  {
    title: 'Time slot',
    dataIndex: 'slotId',
    key: 'slotId',
  },
];

export const BookingHistory = () => {
  const dispatch = useAppDispatch();

  const bookings = useAppSelector(selectBookingHistory);
  const user = useAppSelector(selectUser);

  const [data, setData] = useState(bookings);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleFilter = () => {
    let filteredData = bookings;

    if (startDate && endDate) {
      filteredData = filteredData?.filter((record) => {
        const recordDate = moment(record.bookingDate, 'DD/MM/YYYY');
        return recordDate.isBetween(startDate, endDate, 'day', '[]');
      });
    }

    setData(filteredData);
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setData(bookings);
  };

  useEffect(() => {
    if (user) {
      dispatch(getBookingByAccountIdThunk((user.id as any).toString()));
    }
  }, []);

  return (
    <Container>
      <PageTitle level={2}>Booking History</PageTitle>
      <HistoryContainer>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Row gutter={16} justify="center" align="middle">
              <Col span={5}>
                <span>From</span>
                <DatePicker
                  style={{ width: '78%', marginLeft: '5px' }}
                  format="DD/MM/YYYY"
                  value={startDate ? dayjs(startDate, 'DD/MM/YYYY') : null}
                  onChange={(date) =>
                    setStartDate(date ? date.format('DD/MM/YYYY') : null)
                  }
                />
              </Col>
              <Col span={5}>
                <span>To</span>
                <DatePicker
                  style={{ width: '78%', marginLeft: '5px' }}
                  format="DD/MM/YYYY"
                  value={endDate ? dayjs(endDate, 'DD/MM/YYYY') : null}
                  onChange={(date) =>
                    setEndDate(date ? date.format('DD/MM/YYYY') : null)
                  }
                />
              </Col>
              <Col span={1}>
                <Space.Compact>
                  <Button type="primary" onClick={handleFilter}>
                    Search
                  </Button>
                  <Button onClick={handleReset}>Reset</Button>
                </Space.Compact>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Table columns={columns} dataSource={data} />
              </Col>
            </Row>
          </Col>
        </Row>
      </HistoryContainer>
    </Container>
  );
};
