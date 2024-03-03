import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Statistic,
} from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Cat,
  CatFood,
  Drink,
  selectSelectedCoffeeShopCatFood,
  selectSelectedCoffeeShopDrinks,
  selectSelectedCoffeeShopTables,
  selectSlots,
  Slot,
  Table,
} from '../../redux';
import { useAppSelector } from '../../redux/hooks';

interface BookingFormProps {
  form: FormInstance;
  handleOnSubmit: () => void;
}

const mockSlots: Slot[] = [
  {
    slotId: 1 + '',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    slotId: 2 + '',
    startTime: '11:00',
    endTime: '12:00',
  },
  {
    slotId: 3 + '',
    startTime: '12:00',
    endTime: '13:00',
  },
  {
    slotId: 4 + '',
    startTime: '13:00',
    endTime: '14:00',
  },
];

const mockTables: Table[] = [
  {
    tableId: 1 + '',
    tableName: 'Table 1',
    shopId: 1 + '',
    areaId: 1 + '',
  },
  {
    tableId: 2 + '',
    tableName: 'Table 2',
    shopId: 1 + '',
    areaId: 1 + '',
  },
  {
    tableId: 3 + '',
    tableName: 'Table 3',
    shopId: 1 + '',
    areaId: 1 + '',
  },
  {
    tableId: 4 + '',
    tableName: 'Table 4',
    shopId: 1 + '',
    areaId: 1 + '',
  },
];

const mockDrinks: Drink[] = [
  {
    drinkId: 1,
    drinkName: 'Coffee',
    price: 3.5,
  },
  {
    drinkId: 2,
    drinkName: 'Tea',
    price: 3,
  },
  {
    drinkId: 3,
    drinkName: 'Smoothie',
    price: 4,
  },
  {
    drinkId: 4,
    drinkName: 'Water',
    price: 2,
  },
];

const mockCatFood: CatFood[] = [
  {
    foodCatId: 1,
    foodCatName: 'Dry Food',
    foodPrice: 5,
  },
  {
    foodCatId: 2,
    foodCatName: 'Wet Food',
    foodPrice: 6,
  },
  {
    foodCatId: 3,
    foodCatName: 'Treats',
    foodPrice: 3,
  },
];

export const BookingForm = ({ form, handleOnSubmit }: BookingFormProps) => {
  const slots = useAppSelector(selectSlots);
  const tables = useAppSelector(selectSelectedCoffeeShopTables);
  const drinks = useAppSelector(selectSelectedCoffeeShopDrinks);
  const catFood = useAppSelector(selectSelectedCoffeeShopCatFood);

  const [drinksOptions, setDrinksOptions] = useState(
    drinks?.map((drink) => ({
      label: drink.drinkName,
      value: drink.drinkId.toString(),
    })) || [],
  );
  const [selectedDrinks, setSelectedDrinks] = useState<
    { label: string; value: string }[]
  >([]);
  const [disabledEditDrink, setDisabledEditDrink] = useState<boolean[]>([]);
  const [drinksTotal, setDrinksTotal] = useState(0);
  const [catFoodTotal, setCatFoodTotal] = useState(0);

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

  const handleOnSelectDrinks = (values: { value: string; label: string }) => {
    const { value, label } = values;
    setDrinksOptions((prev) => {
      return [...prev?.filter((d) => d.value != value)];
    });
    setSelectedDrinks((prev) => {
      return [...prev, { label: label, value: value }];
    });
    setDisabledEditDrink((prev) => [...prev, true]);
  };

  const handleOnRemoveDrink = (index: number) => {
    const drink = selectedDrinks[index];
    if (drink) {
      setSelectedDrinks((prev) => prev.filter((d, i) => i !== index));
      setDrinksOptions((prev) => [
        ...prev,
        { label: drink.label, value: drink.value },
      ]);
      setDisabledEditDrink((prev) => {
        const newDisabledEditDrink = [...prev];
        newDisabledEditDrink[index] = false;
        return newDisabledEditDrink;
      });
    }
  };

  const calculateDrinksTotal = useCallback(() => {
    let total = 0;
    selectedDrinks.forEach((selectedDrink) => {
      const drink: Drink | undefined = mockDrinks?.find(
        (drink) => drink.drinkId == +selectedDrink.value,
      );
      if (drink?.price) {
        const quantity = form.getFieldValue([
          'drinks',
          selectedDrinks.findIndex(
            (drink) => drink.value === selectedDrink.value,
          ),
          'quantity',
        ]);
        total += drink.price * (quantity || 0);
      }
    });
    setDrinksTotal(total);
  }, [selectedDrinks, form, disabledEditDrink]);

  const handleOnselectCatFood = (value: string) => {
    const catFoodIds = value.split(',');
    const total = catFoodIds.reduce((acc, curr) => {
      const food = mockCatFood?.find((food) => food.foodCatId === +curr);
      if (food?.foodPrice) {
        return acc + food?.foodPrice;
      }
      return acc;
    }, 0);
    setCatFoodTotal(total);
  };

  useEffect(() => {
    calculateDrinksTotal();
  }, [selectedDrinks, form]);

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
          <Form.Item
            name="bookingDate"
            rules={[
              {
                required: true,
                message: 'Please select a date',
              },
            ]}
          >
            <DatePicker format="DD-MM-YYYY" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <label style={{ textAlign: 'right' }}>Select Table: </label>
        </Col>
        <Col flex="auto">
          <Form.Item
            name="tableId"
            rules={[
              {
                required: true,
                message: 'Please select a table',
              },
            ]}
          >
            <Select options={tableOptions} placeholder="Select your table" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <label style={{ textAlign: 'right' }}>Select slot: </label>
        </Col>
        <Col flex="auto">
          <Form.Item
            name="slotId"
            rules={[{ required: true, message: 'Please select a time slot' }]}
          >
            <Select options={slotOptions} placeholder="Select your time slot" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <label style={{ textAlign: 'right' }}>Select drinks: </label>
        </Col>
        <Col flex="auto">
          <Row>
            <Col>
              <Statistic title="Drinks Total" value={drinksTotal} />
            </Col>
          </Row>
          <Form.List name="drinks">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <>
                    <Row style={{ width: '100%' }} gutter={8}>
                      <Col span={18}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'drinkId']}
                          style={{ width: '100%' }}
                        >
                          <Select
                            onSelect={handleOnSelectDrinks}
                            options={drinksOptions}
                            labelInValue
                            disabled={disabledEditDrink[index]}
                          />
                        </Form.Item>
                      </Col>
                      <Col flex="auto">
                        <Form.Item
                          name={[field.name, 'quantity']}
                          style={{ width: '100%' }}
                          noStyle
                        >
                          <InputNumber
                            defaultValue={0}
                            min={0}
                            placeholder="Quantity"
                            onChange={calculateDrinksTotal}
                          />
                        </Form.Item>
                      </Col>
                      {index === fields.length - 1 ? (
                        <Col span={1}>
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => {
                              handleOnRemoveDrink(index);
                              remove(field.name);
                            }}
                            style={{ fontSize: '20px', marginTop: '6px' }}
                          />
                        </Col>
                      ) : null}
                    </Row>
                  </>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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
        </Col>
      </Row>
    </Form>
  );
};
