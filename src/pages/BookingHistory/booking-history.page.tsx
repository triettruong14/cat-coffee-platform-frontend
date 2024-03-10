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
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Booking,
  BookingStatus,
  cancelBookingThunk,
  getBookingByAccountIdThunk,
  mockBookingHistory,
  selectBookingHistory,
  selectSlots,
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
  max-height: 550px;
  background: #fff;
  padding: 1rem;
`;

const PageTitle = styled(Title)`
  padding-block: 2.5rem;
`;

const TableWrapper = styled.div`
  height: 450px;
  width: 100%;
  overflow-y: scroll;
`;

const StatusTag = styled.span`
  color: #fff;
  background: ${(props) => props.color};
`;

const mockData: Booking[] = [
  {
    bookingId: 1,
    shopName: 'Starbucks',
    bookingDate: '01/01/2021',
    total: 165000,
    tableName: 'Ban 1',
    slotId: 1,
  },
  {
    bookingId: 2,
    shopName: 'Starbucks',
    bookingDate: '01/01/2021',
    total: 165000,
    tableName: 'Ban 1',
    slotId: 1,
  },
  {
    bookingId: 3,
    shopName: 'Starbucks',
    bookingDate: '01/01/2021',
    total: 165000,
    tableName: 'Ban 1',
    slotId: 1,
  },
  {
    bookingId: 4,
    shopName: 'Starbucks',
    bookingDate: '01/01/2021',
    total: 165000,
    tableName: 'Ban 1',
    slotId: 1,
  },
  {
    bookingId: 5,
    shopName: 'Starbucks',
    bookingDate: '01/01/2021',
    total: 165000,
    tableName: 'Ban 1',
    slotId: 1,
  },
  {
    bookingId: 6,
    shopName: 'Starbucks',
    bookingDate: '01/01/2021',
    total: 165000,
    tableName: 'Ban 1',
    slotId: 1,
  },
  {
    bookingId: 7,
    shopName: 'Starbucks',
    bookingDate: '01/01/2021',
    total: 165000,
    tableName: 'Ban 1',
    slotId: 1,
  },
  {
    bookingId: 8,
    shopName: 'Starbucks',
    bookingDate: '01/01/2021',
    total: 165000,
    tableName: 'Ban 1',
    slotId: 1,
  },
];

export const BookingHistory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const bookings = useAppSelector(selectBookingHistory);
  const user = useAppSelector(selectUser);
  const slots = useAppSelector(selectSlots);

  const [data, setData] = useState<Booking[] | undefined>(bookings);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleFilter = () => {
    let filteredData = bookings;

    if (startDate && endDate) {
      filteredData = filteredData?.filter((record) => {
        const recordDate = moment(record.bookingDate, 'DD/MM/YYYY');
        const momentStartDate = moment(startDate, 'DD/MM/YYYY');
        const momentEndDate = moment(endDate, 'DD/MM/YYYY');

        console.log('recordDate', recordDate);
        console.log('startDate', startDate);
        console.log('endDate', endDate);
        return recordDate.isBetween(
          momentStartDate,
          momentEndDate,
          'day',
          '[]',
        );
      });
      setData(filteredData);
    }
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setData(bookings);
  };

  const columns: TableProps<Booking>['columns'] = useMemo(
    () => [
      {
        title: 'Shop',
        dataIndex: 'shopName',
        key: 'shopName',
        render: (shopName, booking) => (
          <Button
            type="link"
            onClick={() => {
              navigate(`detail/${booking.bookingId}`, {
                state: { ...booking },
              });
            }}
          >
            {shopName}
          </Button>
        ),
      },
      {
        title: 'Booking Date',
        dataIndex: 'bookingDate',
        key: 'bookingDate',
        render: (bookingDate) => {
          //format bookingDate from YYYY-MM-DD to DD/MM/YYYY
          return moment(bookingDate, 'DD-MM-YYYY').format('DD/MM/YYYY');
        },
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
      },
      {
        title: 'Table Name',
        dataIndex: 'tableName',
        key: 'tableName',
      },
      {
        title: 'Time slot',
        dataIndex: 'slotId',
        key: 'slotId',
        render: (slotId) => {
          const foundSlot = slots.find((slot) => slot.slotId === slotId);

          return (
            <span>
              {foundSlot?.startTime} - {foundSlot?.endTime}
            </span>
          );
        },
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
          switch (status) {
            case BookingStatus.DONE:
              return (
                <StatusTag style={{ color: 'green' }}>Confirmed</StatusTag>
              );
            case BookingStatus.CANCEL:
              return <StatusTag style={{ color: 'red' }}>Cancelled</StatusTag>;
            case BookingStatus.PENDING:
              return <StatusTag style={{ color: 'gray' }}>Pending</StatusTag>;
            default:
              return <StatusTag style={{ color: 'blue' }}>Pending</StatusTag>;
          }
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, booking) => {
          return (
            <Space.Compact>
              <Button
                type="default"
                style={{ zIndex: '10', display: 'relative' }}
                onClick={() => {
                  navigate(`detail/${booking.bookingId}`, {
                    state: { ...booking },
                  });
                }}
              >
                Detail
              </Button>
              {booking.status === BookingStatus.CANCEL ||
              booking.status === BookingStatus.DONE ? (
                <Button type="primary" disabled>
                  Cancel
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    if (booking.bookingId) {
                      dispatch(cancelBookingThunk(booking.bookingId));
                    }
                  }}
                  type="link"
                  style={{ color: 'red' }}
                >
                  Cancel
                </Button>
              )}
            </Space.Compact>
          );
        },
      },
    ],
    [slots],
  );

  useEffect(() => {
    if (user) {
      dispatch(getBookingByAccountIdThunk((user.id as any).toString()));
    }
  }, []);

  useEffect(() => {
    console.log('bookings', bookings);
    setData(bookings);
  }, [bookings]);

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
                <TableWrapper>
                  <Table
                    columns={columns}
                    dataSource={data}
                    style={{ height: '100%' }}
                  />
                </TableWrapper>
              </Col>
            </Row>
          </Col>
        </Row>
      </HistoryContainer>
    </Container>
  );
};
