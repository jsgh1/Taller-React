import { Platform, StyleSheet } from 'react-native';

const border = '#1f2d46';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07111f',
    padding: 16,
  },
  card: {
    backgroundColor: '#0f1a2b',
    borderRadius: 28,
    padding: 18,
    borderWidth: 1,
    borderColor: border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.22,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 8 },
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.22)',
      },
    }),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kicker: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    color: '#eef2ff',
    fontSize: 26,
    fontWeight: '900',
    lineHeight: 32,
  },
  message: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  infoCard: {
    flexBasis: '48%',
    backgroundColor: '#12263f',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2c4a74',
  },
  infoLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  infoValue: {
    color: '#eef2ff',
    fontSize: 15,
    fontWeight: '900',
  },
  list: {
    backgroundColor: '#07111f',
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: border,
  },
  listItem: {
    color: '#eef2ff',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
    fontWeight: '700',
  },
  primaryButton: {
    backgroundColor: '#22c55e',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  primaryButtonText: {
    color: '#06111f',
    fontSize: 15,
    fontWeight: '900',
  },
});
