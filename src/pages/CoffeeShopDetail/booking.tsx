import { Col, DatePicker, Form, FormInstance, Input, Row, Select } from 'antd';
import { useMemo, useState } from 'react';
import {
  selectSelectedCoffeeShopCatFood,
  selectSelectedCoffeeShopDrinks,
  selectSelectedCoffeeShopTables,
  selectSlots,
} from '../../redux';
import { useAppSelector } from '../../redux/hooks';
interface BookingFormProps {
  form: FormInstance;
  handleOnSubmit: () => void;
}

export const BookingForm = ({ form, handleOnSubmit }: BookingFormProps) => {
  const slots = useAppSelector(selectSlots);
  const tables = useAppSelector(selectSelectedCoffeeShopTables);
  const drinks = useAppSelector(selectSelectedCoffeeShopDrinks);
  const catFood = useAppSelector(selectSelectedCoffeeShopCatFood);

  const [drinksTotal, setDrinksTotal] = useState(0);
  const [catFoodTotal, setCatFoodTotal] = useState(0);

  const drinksOptions = useMemo(
    () =>
      drinks?.map((drink) => ({
        label: drink.drinkName,
        value: drink.drinkId.toString(),
      })),
    [],
  );

  const catFoodOptions = useMemo(
    () =>
      catFood?.map((catFood) => ({
        label: catFood.foodCatName,
        value: catFood.foodCatId.toString(),
      })),
    [],
  );

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

  const handleOnSelectDrinks = (value: string) => {
    const drinkIds = value.split(',');
    const total = drinkIds.reduce((acc, curr) => {
      const drink = drinks?.find((drink) => drink.drinkId === +curr);
      return acc + (drink?.price || 0);
    }, 0);
    setDrinksTotal(total);
  };

  const handleOnselectCatFood = (value: string) => {
    const catFoodIds = value.split(',');
    const total = catFoodIds.reduce((acc, curr) => {
      const food = catFood?.find((food) => food.foodCatId === +curr);
      return acc + (food?.foodPrice || 0);
    }, 0);
    setCatFoodTotal(total);
  };

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
            <Select
              mode="multiple"
              options={drinksOptions}
              placeholder="Select your time slot"
              onSelect={handleOnSelectDrinks}
            />
          </Form.Item>
          <span>{drinksTotal}</span>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <label style={{ textAlign: 'right' }}>Select Cat food: </label>
        </Col>
        <Col flex="auto">
          <Form.Item name="catFoods">
            <Select
              mode="multiple"
              options={catFoodOptions}
              placeholder="Select your time slot"
              onSelect={handleOnselectCatFood}
            />
          </Form.Item>
          <span>{catFoodTotal}</span>
        </Col>
      </Row>
    </Form>
  );
};

