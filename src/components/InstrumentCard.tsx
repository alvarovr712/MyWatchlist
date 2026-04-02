import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Instrument } from '../types/Instrument';

interface Props {
  instrument: Instrument;
  isSmall?: boolean;
  width: number;
}

const InstrumentCard = ({ instrument, isSmall = false, width }: Props) => {
  return (
    <View style={[styles.card, isSmall && { padding: 14 }]}>
      <View style={{ maxWidth: width * 0.55 }}>
        <Text style={[styles.name, isSmall && { fontSize: 15 }]} numberOfLines={1}>
          {instrument.name}
        </Text>
        <Text style={[styles.symbol, isSmall && { fontSize: 13 }]} numberOfLines={1}>
          {instrument.symbol}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.price, isSmall && { fontSize: 15 }]} numberOfLines={1}>
          ${instrument.price.toFixed(2)}
        </Text>
        <Text
          style={[
            styles.change,
            { color: instrument.change >= 0 ? 'green' : 'red' },
            isSmall && { fontSize: 13 },
          ]}
          numberOfLines={1}
        >
          {instrument.change >= 0 ? '+' : ''}
          {instrument.change.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  symbol: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  change: {
    fontSize: 14,
    marginTop: 2,
  },
});

export default InstrumentCard;
