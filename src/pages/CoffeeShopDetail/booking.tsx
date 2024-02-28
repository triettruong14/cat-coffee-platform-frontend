import { Col, DatePicker, Form, FormInstance, Input, Row, Select } from 'antd';
import { useMemo } from 'react';
import { selectSelectedCoffeeShopTables, selectSlots } from '../../redux';
import { useAppSelector } from '../../redux/hooks';
interface BookingFormProps {
  form: FormInstance;
  handleOnSubmit: () => void;
  drinksOptions: { label: string; value: string }[];
  catFoodOptions: { label: string; value: string }[];
}

export const BookingForm = ({
  form,
  handleOnSubmit,
  drinksOptions,
  catFoodOptions,
}: BookingFormProps) => {
  const slots = useAppSelector(selectSlots);
  const tables = useAppSelector(selectSelectedCoffeeShopTables);

  const slotOptions = useMemo(() => {
    return slots.map((slot) => ({
      label: slot.startTime + ' - ' + slot.endTime,
      value: slot.slotId,
    }));
  }, []);

  const tableOptions = useMemo(
    () =>
      tables?.map((table) => ({
        label: table.tableName,
        value: table.tableId,
      })),
    [tables],
  );

  return (
    <Form
      form={form}
      layout="horizontal"
      onFinish={handleOnSubmit}
      style={{ width: '100%' }}
    >
      <Row>
        <Col span={6}>
          <label style={{ textAlign: 'right' }}>Select Date: </label>
        </Col>
        <Col flex="auto">
          <Form.Item name="bookingDate">
            <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <label style={{ textAlign: 'right' }}>Select Table: </label>
        </Col>
        <Col flex="auto">
          <Form.Item name="tableId">
            <Select options={tableOptions} placeholder="Select your table" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <label style={{ textAlign: 'right' }}>Select slot: </label>
        </Col>
        <Col flex="auto">
          <Form.Item name="slotId">
            <Select options={slotOptions} placeholder="Select your time slot" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <label style={{ textAlign: 'right' }}>Select drinks: </label>
        </Col>
        <Col flex="auto">
          <Form.Item name="drinks">
            <Select options={slotOptions} placeholder="Select your time slot" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <label style={{ textAlign: 'right' }}>Select Cat food: </label>
        </Col>
        <Col flex="auto">
          <Form.Item name="catFood">
            <Select options={slotOptions} placeholder="Select your time slot" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
