export interface TumbesWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  condition: string;
  icon: string;
  isDay: boolean;
  timeLima: string;
  timeFormatted: string;
  dateFormatted: string;
  timezone: string;
  source: string;
}
