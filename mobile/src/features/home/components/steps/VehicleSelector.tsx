import { Button, View } from '@/core';
import { useTranslation } from 'react-i18next';
import { TripOptionItem } from '../TripOptionItem';
import { VEHICLES_IMAGES } from '@/assets/images/vehicles';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { RideQuote } from '../../domain/ride';
import { useFetch } from '@/core/hooks/useFetch';
import { getQuotes } from '../../services/getQuote';

const data = [
  {
    id: '1',
    name: 'Economic',
    price: 1840,
    detail: 'Vehiculos estandar',
    capacity: 4,
    image: VEHICLES_IMAGES.economy,
    currency: 'EUR',
  },
  {
    id: '2',
    name: 'Comfort',
    price: 2550,
    detail: 'Vehiculos amplios',
    capacity: 4,
    image: VEHICLES_IMAGES.comfort,
    currency: 'EUR',
  },
  {
    id: '3',
    name: 'Comfort',
    price: 2990,
    detail: 'Vehiculos estandar y premium',
    capacity: 4,
    image: VEHICLES_IMAGES.premium,
    currency: 'EUR',
  },
  {
    id: '4',
    name: 'Electric',
    price: 2790,
    detail: 'Vehiculos ambientales',
    capacity: 4,
    image: VEHICLES_IMAGES.electric,
    currency: 'EUR',
  },
  {
    id: '5',
    name: 'Comfort',
    price: 3680,
    detail: 'Vehiculos amplios',
    capacity: 6,
    image: VEHICLES_IMAGES.xl,
    currency: 'EUR',
  },
];

export function VehicleSelector() {
  const { t } = useTranslation('home');
  const { status } = useFetch<RideQuote>(getQuotes, { inmediate: true });
  console.log({ status });
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TripOptionItem
            id={item.id}
            name={item.name}
            price={item.price}
            detail={item.detail}
            capacity={item.capacity}
            image={item.image}
            currency={item.currency}
          />
        )}
      />
      <View style={styles.bookingOptions}>
        <Button>{t('bottom_sheet.vehicle_selector.button_selector')}</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookingOptions: {
    padding: 16,
    paddingBottom: 8,
    paddingTop: 16,
    borderTopWidth: 1,
  },
});
