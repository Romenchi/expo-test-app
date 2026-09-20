import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Platform,
  Dimensions,
  Vibration,
  Alert,
  StatusBar as RNStatusBar,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [activeTab, setActiveTab] = useState('demo'); // 'demo' | 'system' | 'guide'
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [counter, setCounter] = useState(0);
  const [testText, setTestText] = useState('');
  const [vibrationCount, setVibrationCount] = useState(0);

  const windowDimensions = Dimensions.get('window');

  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleIncrement = () => {
    setCounter((prev) => prev + 1);
    try {
      Vibration.vibrate(30);
    } catch (_) {}
  };

  const handleDecrement = () => {
    setCounter((prev) => prev - 1);
    try {
      Vibration.vibrate(30);
    } catch (_) {}
  };

  const handleReset = () => {
    setCounter(0);
    try {
      Vibration.vibrate([0, 50, 50, 50]);
    } catch (_) {}
  };

  const handleTriggerVibration = () => {
    setVibrationCount((prev) => prev + 1);
    try {
      Vibration.vibrate(150);
    } catch (_) {}
  };

  const handleShowAlert = () => {
    Alert.alert(
      'Expo Go Alert',
      'Нативное модальное окно работает корректно на вашем устройстве!',
      [
        { text: 'Отлично', style: 'default' },
        { text: 'Закрыть', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.border }]}>
        <View style={styles.headerTitleContainer}>
          <Ionicons name="rocket-outline" size={24} color={theme.accent} />
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
            Expo Go Demo
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons
            name={isDarkMode ? 'moon' : 'sunny'}
            size={18}
            color={theme.textSecondary}
            style={{ marginRight: 6 }}
          />
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: '#cbd5e1', true: '#6366f1' }}
            thumbColor={isDarkMode ? '#ffffff' : '#f8fafc'}
          />
        </View>
      </View>

      {/* Connection Banner */}
      <View style={[styles.banner, { backgroundColor: theme.bannerBg, borderColor: theme.bannerBorder }]}>
        <View style={styles.statusDot} />
        <Text style={[styles.bannerText, { color: theme.bannerText }]}>
          Подключено к Expo Go (SDK 57)
        </Text>
      </View>

      {/* Tab Selector */}
      <View style={[styles.tabBar, { backgroundColor: theme.cardBg }]}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'demo' && { backgroundColor: theme.accent }]}
          onPress={() => setActiveTab('demo')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="play-circle-outline"
            size={18}
            color={activeTab === 'demo' ? '#ffffff' : theme.textSecondary}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'demo' ? '#ffffff' : theme.textSecondary },
            ]}
          >
            Тесты
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'system' && { backgroundColor: theme.accent }]}
          onPress={() => setActiveTab('system')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="phone-portrait-outline"
            size={18}
            color={activeTab === 'system' ? '#ffffff' : theme.textSecondary}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'system' ? '#ffffff' : theme.textSecondary },
            ]}
          >
            Устройство
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'guide' && { backgroundColor: theme.accent }]}
          onPress={() => setActiveTab('guide')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="book-outline"
            size={18}
            color={activeTab === 'guide' ? '#ffffff' : theme.textSecondary}
          />
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'guide' ? '#ffffff' : theme.textSecondary },
            ]}
          >
            Гайд
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'demo' && (
          <>
            {/* Counter Section */}
            <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="calculator-outline" size={20} color={theme.accent} />
                <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
                  Интерактивный счётчик
                </Text>
              </View>
              <Text style={[styles.cardDescription, { color: theme.textSecondary }]}>
                Проверка состояния React, рендеринга и тактильного отклика (вибрации).
              </Text>

              <View style={styles.counterContainer}>
                <Text style={[styles.counterValue, { color: theme.accent }]}>{counter}</Text>
              </View>

              <View style={styles.counterButtonsRow}>
                <TouchableOpacity
                  style={[styles.btn, styles.btnSecondary, { borderColor: theme.border }]}
                  onPress={handleDecrement}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.btnSecondaryText, { color: theme.textPrimary }]}>-1</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, styles.btnOutline, { borderColor: theme.border }]}
                  onPress={handleReset}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.btnOutlineText, { color: theme.textSecondary }]}>Сброс</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, styles.btnPrimary, { backgroundColor: theme.accent }]}
                  onPress={handleIncrement}
                  activeOpacity={0.7}
                >
                  <Text style={styles.btnPrimaryText}>+1</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Input Live Preview Section */}
            <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="text-outline" size={20} color={theme.accent} />
                <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
                  Ввод текста и рендеринг
                </Text>
              </View>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.inputBg,
                    borderColor: theme.border,
                    color: theme.textPrimary,
                  },
                ]}
                placeholder="Введите любой текст..."
                placeholderTextColor={theme.textPlaceholder}
                value={testText}
                onChangeText={setTestText}
              />
              <View style={styles.previewBox}>
                <Text style={[styles.previewLabel, { color: theme.textSecondary }]}>Живой предпросмотр:</Text>
                <Text style={[styles.previewText, { color: theme.textPrimary }]}>
                  {testText ? testText : 'Пока ничего не введено'}
                </Text>
              </View>
            </View>

            {/* Native Actions Section */}
            <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="hardware-chip-outline" size={20} color={theme.accent} />
                <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
                  Нативные возможности устройства
                </Text>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: theme.accent }]}
                  onPress={handleTriggerVibration}
                  activeOpacity={0.8}
                >
                  <Ionicons name="phone-portrait" size={18} color="#fff" />
                  <Text style={styles.actionBtnText}>
                    Тест вибрации ({vibrationCount})
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionBtn, { backgroundColor: '#0ea5e9' }]}
                  onPress={handleShowAlert}
                  activeOpacity={0.8}
                >
                  <Ionicons name="alert-circle-outline" size={18} color="#fff" />
                  <Text style={styles.actionBtnText}>Показать нативный Alert</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        {activeTab === 'system' && (
          <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="information-circle-outline" size={22} color={theme.accent} />
              <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
                Параметры устройства и окружения
              </Text>
            </View>

            <View style={styles.infoList}>
              <InfoRow
                icon="logo-android"
                label="Платформа"
                value={`${Platform.OS.toUpperCase()} (v${Platform.Version})`}
                theme={theme}
              />
              <InfoRow
                icon="resize-outline"
                label="Разрешение экрана"
                value={`${Math.round(windowDimensions.width)} × ${Math.round(windowDimensions.height)} pt`}
                theme={theme}
              />
              <InfoRow
                icon="scale-outline"
                label="Масштаб пикселей (Scale)"
                value={`${windowDimensions.scale}x`}
                theme={theme}
              />
              <InfoRow
                icon="cube-outline"
                label="Expo SDK"
                value="v57.0.24"
                theme={theme}
              />
              <InfoRow
                icon="logo-react"
                label="React / React Native"
                value="19.2.3 / 0.86.3"
                theme={theme}
              />
              <InfoRow
                icon="wifi-outline"
                label="Режим работы"
                value="Expo Go Client"
                theme={theme}
              />
            </View>
          </View>
        )}

        {activeTab === 'guide' && (
          <>
            <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="flash-outline" size={20} color={theme.accent} />
                <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
                  Быстрая перезагрузка (Fast Refresh)
                </Text>
              </View>
              <Text style={[styles.guideText, { color: theme.textSecondary }]}>
                1. Откройте файл <Text style={{ fontWeight: 'bold', color: theme.textPrimary }}>App.js</Text> в редакторе кодов.
                {'\n'}2. Измените любой текст или цвет и сохраните файл (<Text style={{ fontWeight: 'bold' }}>Ctrl + S</Text>).
                {'\n'}3. Экран на телефоне в Expo Go обновится моментально без потери состояния!
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="menu-outline" size={20} color={theme.accent} />
                <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
                  Меню разработчика Expo
                </Text>
              </View>
              <Text style={[styles.guideText, { color: theme.textSecondary }]}>
                • <Text style={{ fontWeight: 'bold', color: theme.textPrimary }}>Встряхните телефон</Text> (Shake Gesture), чтобы открыть Developer Menu в Expo Go.
                {'\n'}• В меню можно включить инспектор элементов (Element Inspector), монитор производительности (Perf Monitor) или принудительно перезагрузить бандл.
              </Text>
            </View>

            <View style={[styles.card, { backgroundColor: theme.cardBg, borderColor: theme.border }]}>
              <View style={styles.cardHeader}>
                <Ionicons name="help-buoy-outline" size={20} color={theme.accent} />
                <Text style={[styles.cardTitle, { color: theme.textPrimary }]}>
                  Совет по сети (Wi-Fi / Tunnel)
                </Text>
              </View>
              <Text style={[styles.guideText, { color: theme.textSecondary }]}>
                Если телефон и компьютер находятся в разных Wi-Fi подсетях (или мобильный интернет), запустите сервер с флагом tunnel:
                {'\n\n'}
                <Text style={styles.codeSnippet}>npx expo start --tunnel</Text>
              </Text>
            </View>
          </>
        )}

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Собрано с любовью для Expo Go 🚀
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ icon, label, value, theme }) {
  return (
    <View style={[styles.infoRow, { borderBottomColor: theme.border }]}>
      <View style={styles.infoRowLeft}>
        <Ionicons name={icon} size={18} color={theme.accent} style={{ marginRight: 10 }} />
        <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>{label}</Text>
      </View>
      <Text style={[styles.infoValue, { color: theme.textPrimary }]}>{value}</Text>
    </View>
  );
}

const lightTheme = {
  background: '#f8fafc',
  cardBg: '#ffffff',
  textPrimary: '#0f172a',
  textSecondary: '#64748b',
  textPlaceholder: '#94a3b8',
  border: '#e2e8f0',
  accent: '#6366f1',
  bannerBg: '#e0e7ff',
  bannerBorder: '#c7d2fe',
  bannerText: '#3730a3',
  inputBg: '#f1f5f9',
};

const darkTheme = {
  background: '#0f172a',
  cardBg: '#1e293b',
  textPrimary: '#f8fafc',
  textSecondary: '#94a3b8',
  textPlaceholder: '#64748b',
  border: '#334155',
  accent: '#818cf8',
  bannerBg: '#1e1b4b',
  bannerBorder: '#312e81',
  bannerText: '#a5b4fc',
  inputBg: '#0f172a',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
  bannerText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  counterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  counterValue: {
    fontSize: 52,
    fontWeight: '800',
  },
  counterButtonsRow: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  btnSecondary: {
    borderWidth: 1,
  },
  btnSecondaryText: {
    fontSize: 16,
    fontWeight: '700',
  },
  btnOutline: {
    borderWidth: 1,
  },
  btnOutlineText: {
    fontSize: 14,
    fontWeight: '600',
  },
  textInput: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 15,
    marginBottom: 12,
  },
  previewBox: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.08)',
  },
  previewLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  previewText: {
    fontSize: 15,
    fontWeight: '600',
  },
  actionButtons: {
    gap: 10,
    marginTop: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  actionBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoList: {
    marginTop: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 13,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
  },
  guideText: {
    fontSize: 14,
    lineHeight: 22,
  },
  codeSnippet: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontWeight: '700',
    color: '#38bdf8',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
  },
});
