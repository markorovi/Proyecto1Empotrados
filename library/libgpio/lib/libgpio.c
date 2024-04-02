#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <fcntl.h>
#include <stdint.h>
#include <libgpio.h>

#define GPIO_PATH "/sys/class/gpio"

#define LED_COUNT 6     // Number of LEDs in the strip
#define LED_PIN 18      // BCM GPIO pin connected to the LED strip

uint8_t led_buffer[LED_COUNT * 3];


void exportPin(int pin) {
    char path[50];
    int fd;

    sprintf(path, "%s/export", GPIO_PATH);
    fd = open(path, O_WRONLY);
    sprintf(path, "%d", pin);
    write(fd, path, strlen(path));
    close(fd);
}

void closePin(int pin) {
    char path[50];
    int fd;

    sprintf(path, "%s/unexport", GPIO_PATH);
    fd = open(path, O_WRONLY);
    sprintf(path, "%d", pin);
    write(fd, path, strlen(path));
    close(fd);
}

void pinMode(int pin, int mode) {
    char path[50];
    int fd;

    exportPin(pin);

    sprintf(path, "%s/gpio%d/direction", GPIO_PATH, pin);
    fd = open(path, O_WRONLY);
    if (mode == 0) {
        write(fd, "in", 2);
    } else {
        write(fd, "out", 3);
    }
    close(fd);
}

void digitalWrite(int pin, int value) {
    char path[50];
    int fd;

    sprintf(path, "%s/gpio%d/value", GPIO_PATH, pin);
    fd = open(path, O_WRONLY);
    if (value == 0) {
        write(fd, "0", 1);
    } else {
        write(fd, "1", 1);
    }
    close(fd);
}

int digitalRead(int pin) {
    char path[50];
    int fd, value;
    char buf[2];

    sprintf(path, "%s/gpio%d/value", GPIO_PATH, pin);
    fd = open(path, O_RDONLY);
    read(fd, buf, 1);
    close(fd);

    value = atoi(buf);
    return value;
}

void blink(int pin, float freq, int duration) {
    int period = 1.0 / freq * 1000000;
    int elapsed = 0;

    while (elapsed < duration * 1000000) {
        digitalWrite(pin, 1);
        usleep(period / 2);
        digitalWrite(pin, 0);
        usleep(period / 2);
        elapsed += period;
    }
}

void send_bit(int bit) {
    if (bit) {
        // Send a 1 bit
        digitalWrite(LED_PIN, 1);
        usleep(700);
        digitalWrite(LED_PIN, 0);
        usleep(600);
    } else {
        // Send a 0 bit
        digitalWrite(LED_PIN, 1);
        usleep(350);
        digitalWrite(LED_PIN, 0);
        usleep(800);
    }
}

void send_led_color(uint8_t red, uint8_t green, uint8_t blue) {
    uint8_t bit_mask;
    for (bit_mask = 0x80; bit_mask; bit_mask >>= 1) {
        send_bit(green & bit_mask);
        send_bit(red & bit_mask);
        send_bit(blue & bit_mask);
    }
}

void send_data() {
    for (int i = 0; i < LED_COUNT; i++) {
        send_led_color(led_buffer[i * 3 + 1], led_buffer[i * 3], led_buffer[i * 3 + 2]);
    }
}

void set_led_color(int led_index, uint8_t red, uint8_t green, uint8_t blue) {
    if (led_index >= 0 && led_index < LED_COUNT) {
        led_buffer[led_index * 3] = green;
        led_buffer[led_index * 3 + 1] = red;
        led_buffer[led_index * 3 + 2] = blue;
    }
}

void turn_on_led(int led_index) {
    set_led_color(led_index, 255, 255, 255);
}

void turn_off_led(int led_index) {
    set_led_color(led_index, 0, 0, 0);
}

void prueba(){
	printf("Probando\n");
}

void take_picture(){
	char command[256];
	sprintf(command, "fswebcam -r 1280x720 --no-banner /home/root/images/latest_image.jpg");
	system(command);
}
