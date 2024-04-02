#ifndef GPIO_LIB_H
#define GPIO_LIB_H

void exportGPIO(int pin);
void unexportGPIO(int pin);
void pinMode(int pin, int mode);
void digitalWrite(int pin, int value);
int digitalRead(int pin);
void blink(int pin, float freq, int duration);
void send_bit(int bit);
void send_led_color(uint8_t red, uint8_t green, uint8_t blue);
void send_data();
void set_led_color(int led_index, uint8_t red, uint8_t green, uint8_t blue);
void turn_on_led(int led_index);
void turn_off_led(int led_index);
void prueba();
void take_picture();


#endif
