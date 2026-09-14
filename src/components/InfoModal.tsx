import { Modal, Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';

export type InfoModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onDismiss: () => void;
};

const InfoModal = ({
  visible,
  title,
  message,
  confirmLabel = 'Got it',
  onConfirm,
  onDismiss,
}: InfoModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      // Fires on the Android hardware back button, so the modal is not a trap.
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.backdrop} onPress={onDismiss}>
        {/* Swallow taps on the sheet so they do not reach the backdrop. */}
        <Pressable style={styles.sheet} onPress={() => {}}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <Pressable style={styles.confirm} onPress={onConfirm}>
            <Text style={styles.confirmText}>{confirmLabel}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    padding: 30,
  },
  sheet: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 22,
    width: '100%',
  },
  title: {
    fontSize: 20,
    paddingBottom: 10,
  },
  message: {
    fontSize: 15,
    lineHeight: 21,
    paddingBottom: 22,
  },
  confirm: {
    borderWidth: 2,
    paddingVertical: 14,
  },
  confirmText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default InfoModal;
