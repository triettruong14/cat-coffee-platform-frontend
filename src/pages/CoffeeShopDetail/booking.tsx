import { Col, DatePicker, Form, FormInstance, Input, Row, Select } from 'antd';
import { useMemo } from 'react';
import { selectSelectedCoffeeShopTables, selectSlots } from '../../redux';
import { useAppSelector } from '../../redux/hooks';
interface BookingFormProps {
  form: FormInstance;
  handleOnSubmit: () => void;
}

export const BookingForm = ({ form, handleOnSubmit }: BookingFormProps) => {
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
          <label style={{ textAlign: 'right' }}>Select Table: </label>
        </Col>
        <Col flex="auto">
          <Form.Item name="tableName">
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
    </Form>
  );
};
