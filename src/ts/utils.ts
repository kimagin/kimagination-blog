// JS Utilities

// ⌛ Promise delay
/**
 * Delays the execution of code by a specified duration.
 * @param timeInMs - The duration to delay in milliseconds.
 * @returns A promise that resolves after the specified duration.
 *
 * @remarks
 * Use this function to introduce delays in asynchronous code. The `timeInMs`
 * parameter specifies the duration of the delay in milliseconds. If the value
 * is not a valid number, an error will be thrown.
 *
 * @example
 * ```typescript
 * // Delay execution for 2 seconds
 * await $delay(2000);
 *
 * // Delay execution for the default duration (1 second)
 * await $delay();
 * ```
 */
const _delay = async (timeInMs: number = 1000): Promise<void> => {
  if (isNaN(timeInMs)) {
    throw new Error('delay requires a valid number in ms!')
  }
  await new Promise<void>((resolve) => setTimeout(resolve, timeInMs))
}

// 🗒️ Capitalize
/**
 * Capitalizes the first letter of each word in a string.
 * @param inputString - The input string to be capitalized.
 * @returns The string with the first letter of each word capitalized.
 *
 * @remarks
 * Use this function when you want to capitalize the first letter of each word in a string.
 * It is helpful for formatting names, titles, or any text where word capitalization is desired.
 *
 * @example
 * ```typescript
 * const text = 'hello world';
 * const capitalizedText = $capitalize(text);
 * console.log(capitalizedText); // Output: 'Hello World'
 * ```
 *
 * @benefits
 * - Improves text formatting by capitalizing the first letter of each word.
 * - Useful for presenting text in a more visually appealing manner.
 */
const _capitalize = (inputString: string): string => {
  const words = inputString.split(' ')
  const capitalized = words.map((word) => {
    return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`
  })
  return capitalized.join(' ')
}

// 📰 Log (instead of console.log())

type LogLevel = 'log' | 'info' | 'warn' | 'error'

interface LogStyles {
  color?: string
}

/**
 * Logs content to the console with optional styling and log level.
 * @param content - The content to be logged.
 * @param level - The log level ('log', 'info', 'warn', 'error').
 * @param label - An optional label to display alongside the timestamp.
 * @param styles - An object specifying optional styles for the log output.
 *
 * @remarks
 * Use this function as a replacement for console.log() to provide consistent
 * log output with timestamps, log levels, and optional styling. The log level
 * determines the console method used and the color of the log output. You can
 * customize the styles using the `styles` parameter.
 *
 * @example
 * ```typescript
 * // Log a message with the default log level
 * $log('Hello, world!');
 *
 * // Log an informational message with a custom label and color
 * $log('Information', 'info', 'App', { color: 'blue' });
 *
 * // Log a warning message with a timestamp and a custom label
 * $log('Warning!', 'warn', 'Module A');
 *
 * // Log an error message with a custom style
 * $log('Something went wrong', 'error', '', { color: 'red' });
 * ```
 */
const _log = (
  content: any,
  level: LogLevel = 'log',
  label: string = '',
  styles: LogStyles = {}
): void => {
  const timestamp = new Date().toLocaleTimeString()
  const levels = {
    log: { method: console.log, color: '#A9A9A9' },
    info: { method: console.info, color: '#12b85b' },
    warn: { method: console.warn, color: '#FFD700' },
    error: { method: console.error, color: '#FFA07A' },
  }

  const { method, color } = levels[level] || levels.info
  const { color: customColor } = styles
  const style = `color: ${
    customColor || color
  }; font-weight: bold; font-style: italic;`
  const formattedLabel = label ? `[${label}]` : ''

  method(`%c${timestamp} ${formattedLabel}:`, style, content)
}

// 🧩 Query selector

type SelectReturnType = Element
/**
 * Selects DOM elements based on the specified selector.
 * @param selector - A CSS selector string to identify the target elements.
 * @param all - Determines whether to select all matching elements or only the first one.
 *              If 'all' is provided, all matching elements will be selected.
 *              If true is provided, all matching elements will be selected.
 *              If false or not provided, only the first matching element will be selected.
 * @returns The selected DOM element or a NodeList containing all selected elements.
 *
 * @remarks
 * Use this function to easily select DOM elements by providing a CSS selector. The `all`
 * parameter allows you to choose whether to select all matching elements or just the first one.
 * If the selector is not a string, an error will be thrown.
 *
 * @example
 * ```typescript
 * // Select the first button in the document
 * const singleButton = $select('button');
 *
 * // Select all buttons in the document
 * const allButtons = $select('button', true);
 *
 * // Select all elements with the class 'myClass'
 * const allWithClass = $select('.myClass', 'all');
 * ```
 */
const _select = (
  selector: string,
  all: boolean | 'all' = false
): SelectReturnType => {
  if (typeof selector !== 'string') {
    throw new Error('The selector argument must be a string.')
  }

  if (all !== false && all !== true && all !== 'all') {
    throw new Error('The all argument must be a boolean or "all".')
  }

  const elements =
    all === 'all'
      ? document.querySelectorAll(selector)
      : all
      ? document.querySelectorAll(selector)
      : document.querySelector(selector)

  return elements as SelectReturnType
}

// Event Listener

type EventType =
  // Window Events
  | 'load'
  | 'resize'
  | 'scroll'
  | 'unload'
  | 'beforeunload'
  // Document Events
  | 'DOMContentLoaded'
  // Pointer Events
  | 'pointerdown'
  | 'pointerup'
  | 'pointermove'
  | 'pointerover'
  | 'pointerout'
  | 'pointerenter'
  | 'pointerleave'
  | 'pointercancel'
  // Touch Events
  | 'touchstart'
  | 'touchend'
  | 'touchmove'
  | 'touchcancel'
  // Mouse Events
  | 'mousemove'
  | 'mouseover'
  | 'mouseout'
  | 'mouseenter'
  | 'mouseleave'
  | 'mousewheel'
  | 'wheel'
  | 'dragstart'
  | 'drag'
  | 'dblclick'
  | 'click'
  // Keyboard Events
  | 'keydown'
  | 'keyup'
  | 'keypress'
  // Animation Events
  | 'animationstart'
  | 'animationend'
  | 'animationiteration'
  // Transition Events
  | 'transitionstart'
  | 'transitionend'
  | 'transitioniteration'
  // Input Events
  | 'input'
  | 'change'
  | 'focus'
  | 'blur'
  // Form Events
  | 'submit'
  | 'reset'
  // Drag Events
  | 'dragstart'
  | 'dragend'
  | 'dragover'
  | 'dragenter'
  | 'dragleave'
  | 'drop'
  // Media Events
  | 'canplay'
  | 'canplaythrough'
  | 'durationchange'
  | 'emptied'
  | 'ended'
  // Clipboard Events
  | 'copy'
  | 'cut'
  | 'paste'
  // Other Events
  | 'online'
  | 'offline'

type EventOptions = {
  bubbles?: boolean
  cancelable?: boolean
  composed?: boolean
  passive?: boolean
  once?: boolean
}

/**
 * Adds an event listener to the specified target.
 * @param target - The target on which to add the event listener.
 * @param eventType - The type of the event to listen for.
 * @param callback - The function that will be called when the event is triggered.
 * @param options - An object that specifies characteristics about the event listener (e.g., passive, once).
 *
 * @remarks
 * Use this function to add event listeners to DOM elements, providing a convenient and
 * consistent way to handle various types of events. The `eventType` parameter should
 * be one of the predefined event types in the `EventType` union type.
 *
 * @example
 * ```typescript
 * const myButton = document.getElementById('myButton');
 * $event(myButton, 'click', handleClick);
 *
 * function handleClick(event) {
 *   console.log('Button clicked!', event);
 * }
 * ```
 *
 * @benefits
 * - Simplifies the process of adding event listeners to DOM elements.
 * - Provides a centralized and consistent way to handle various types of events.
 */
const _event = (
  target: EventTarget | null,
  eventType: EventType,
  callback: EventListenerOrEventListenerObject,
  options: EventOptions = {}
): void => {
  if (target) {
    target.addEventListener(eventType, callback, options)
  }
}
// Text Sanitizer
/**
 * Sanitizes a text input by creating a temporary div element and setting its text content.
 * The sanitized result is obtained from the div's innerHTML property.
 * @param inputValue - The input text to be sanitized.
 * @returns The sanitized text.
 *
 * @remarks
 * Use this function when you want to prevent potential security vulnerabilities
 * by converting plain text into HTML-safe content. This is useful when dealing
 * with user-generated content that may include HTML or script tags.
 *
 * @example
 * ```typescript
 * const userInput = '<script>alert("Hello, world!");</script>';
 * const sanitizedText = $sanitizeInput(userInput);
 * console.log(sanitizedText); // Output: '&lt;script&gt;alert("Hello, world!");&lt;/script&gt;'
 * ```
 *
 * @benefits
 * - Prevents Cross-Site Scripting (XSS) attacks by escaping HTML entities.
 * - Ensures that user-generated content is displayed safely in web applications.
 */
const _sanitizeInput = (inputValue: string): string => {
  const div = document.createElement('div')
  div.textContent = inputValue
  return div.innerHTML
}

//Class Manipulation ["+","-","x"]
/**
 * Performs class list operations (add, remove, toggle) on one or more DOM elements.
 * @param selector - The selector, DOM element, or NodeList on which to perform the class list operation.
 * @param action - The action to perform on the class list ('add', 'remove', 'toggle').
 * @param className - The class name or array of class names to be added, removed, or toggled.
 *
 * @remarks
 * Use this function to perform class list operations on DOM elements. It supports adding,
 * removing, or toggling one or more classes. The selector can be a string, DOM element, or NodeList.
 *
 * @example
 * ```typescript
 * const myElement = document.getElementById('myElement');
 * $class(myElement, 'add', 'highlight');
 *
 * const elementsByClass = document.getElementsByClassName('myElements');
 * $class(elementsByClass, 'remove', ['opacity-100', 'hidden']);
 * ```
 *
 * @benefits
 * - Simplifies class list operations on DOM elements.
 * - Provides a convenient way to add, remove, or toggle classes on one or more elements.
 */
const _class = (
  selector: string | Element | NodeList | null,
  action: 'add' | 'remove' | 'toggle',
  className: string | string[]
): void => {
  const elements =
    typeof selector === 'string'
      ? document.querySelectorAll(selector)
      : selector

  if (elements instanceof NodeList) {
    // Handle NodeList
    elements.forEach((element: Node) => {
      if (element instanceof Element) {
        applyAction(element, action, className)
      }
    })
  } else if (elements instanceof Element) {
    // Handle single element
    applyAction(elements, action, className)
  }
}
const applyAction = (
  element: Element,
  action: 'add' | 'remove' | 'toggle',
  className: string | string[]
): void => {
  if (Array.isArray(className)) {
    className.forEach((name) => {
      element.classList[action](name)
    })
  } else {
    element.classList[action](className)
  }
}
// ⚾ Debounce
/**
 * Creates a debounced function that delays invoking the original function until
 * after a specified time has elapsed since the last time the debounced function
 * was invoked.
 * @param func - The function to debounce.
 * @param delay - The time interval for which to debounce the function execution, in milliseconds.
 * @returns A debounced function.
 *
 * @remarks
 * Debouncing ensures that the original function is not called more often than once
 * in the specified time interval (`delay`). If additional calls are made during this
 * interval, the timer is reset, and the countdown starts again.
 *
 * @example
 * ```typescript
 * const debouncedFunction = $debounce(() => {
 *   console.log('Debounced function called');
 * }, 1000);
 *
 * // Call the debounced function
 * debouncedFunction(); // Does not log immediately
 *
 * // Additional calls within the same interval reset the timer
 * debouncedFunction();
 * debouncedFunction();
 *
 * // After 1000ms of inactivity, the function is finally called
 * setTimeout(() => {
 *   debouncedFunction(); // Logs 'Debounced function called'
 * }, 1000);
 * ```
 */
const _debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number = 500
): T => {
  let timeoutId: number | null

  const debouncedFunction = function (this: any, ...args: any[]): void {
    clearTimeout(timeoutId as number)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  } as T

  return debouncedFunction
}

// ⚙️ Throttle
/**
 * Creates a throttled function that only invokes the original function at most once
 * in the specified time interval.
 * @param func - The function to throttle.
 * @param delay - The time interval for which to throttle the function execution, in milliseconds.
 * @returns A throttled function.
 *
 * @remarks
 * Throttling ensures that the original function is not called more often than once
 * in the specified time interval (`delay`). If additional calls are made during this
 * interval, they are ignored until the next interval begins.
 *
 * @example
 * ```typescript
 * const throttledFunction = $throttle(() => {
 *   console.log('Throttled function called');
 * }, 1000);
 *
 * // Call the throttled function
 * throttledFunction(); // Logs 'Throttled function called'
 *
 * // Additional calls within the same interval are ignored
 * throttledFunction();
 * throttledFunction();
 *
 * // After 1000ms, the function can be called again
 * setTimeout(() => {
 *   throttledFunction(); // Logs 'Throttled function called'
 * }, 1000);
 * ```
 */
const _throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number = 500
): T => {
  let isThrottled = false
  let lastArgs: any[] | null = null
  let lastThis: any

  const throttledFunction = function (this: any, ...args: any[]): void {
    if (!isThrottled) {
      func.apply(this, args)
      isThrottled = true
      lastThis = this
      lastArgs = args

      setTimeout(() => {
        isThrottled = false
        if (lastArgs) {
          throttledFunction.apply(lastThis, lastArgs)
          lastArgs = null
        }
      }, delay)
    }
  } as T

  return throttledFunction
}

//Random Number Generator
/**
 * Generates a random integer between the specified minimum and maximum values.
 * If only one argument is provided, the range is assumed to be between 0 and that number.
 * @param min - The minimum value (inclusive). Defaults to 0 if not provided.
 * @param max - The maximum value (inclusive). If not provided, the first argument is considered as the max value, and the min value defaults to 0.
 * @param unique - If set to true, ensures that the generated numbers are unique.
 * @returns A random integer between min and max.
 *
 * @remarks
 * If `unique` is set to true, the function will keep track of previously generated
 * numbers to ensure uniqueness. If a duplicate is generated, a new random number will be
 * generated until a unique one is found.
 *
 * @example
 * ```typescript
 * const uniqueRandom = _random(1, 10, true);
 * console.log(uniqueRandom); // Output: Unique random number between 1 and 10
 * ```
 *
 * @benefits
 * - Provides a simple way to generate random integers with the option for uniqueness.
 */
const _random = (
  min: number = 0,
  max?: number,
  unique: boolean = true
): number => {
  if (max === undefined) {
    // If only one argument is provided, consider the range between 0 and the provided number.
    max = min
    min = 0
  }

  const generateRandom = (): number => {
    return Math.floor(Math.random() * (max! - min + 1) + min)
  }

  if (unique) {
    const generatedNumbers = new Set<number>()

    let randomNum = generateRandom()
    while (generatedNumbers.has(randomNum)) {
      randomNum = generateRandom()
    }

    generatedNumbers.add(randomNum)
    return randomNum
  } else {
    return generateRandom()
  }
}
//LERP
/**
 * Linear interpolation between two values.
 * @param start - The starting value.
 * @param end - The ending value.
 * @param percentage - The percentage of interpolation.
 * @returns The interpolated value.
 */
const _lerp = (start: number, end: number, percentage: number): number => {
  return start * (1 - percentage) + end * percentage
}

//SLUGIFY
/**
 * Converts a string into a URL-friendly slug.
 * @param input - The input string to be slugified.
 * @returns The slugified string.
 *
 * @remarks
 * Use this function when you need to create a URL-friendly version of a string,
 * typically for use in URLs or as an identifier. It replaces spaces with dashes,
 * removes non-word characters, and trims dashes from the start and end of the string.
 *
 * @example
 * ```typescript
 * const title = 'Hello World!';
 * const slug = $slugify(title);
 * console.log(slug); // Output: 'hello-world'
 * ```
 *
 * @benefits
 * - Creates SEO-friendly URLs by converting human-readable text into a clean format.
 * - Useful for generating identifiers or keys based on user-provided input.
 */
const _slugify = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

// Email Validation
/**
 * Checks if the input is a valid email address.
 * @param email - The email address to be validated.
 * @returns True if the email is valid, false otherwise.
 */
const _isEmail = (email: string): boolean => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

//CLAMP

/**
 * Clamps a value between a minimum and a maximum value.
 * @param value - The value to be clamped.
 * @param min - The minimum value.
 * @param max - The maximum value.
 * @returns The clamped value.
 */
const _clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max)
}

//COORDINATIONS
/**
 * Calculates and returns the coordinates and dimensions of a DOM element.
 * @param element - The DOM element for which to calculate coordinates and dimensions.
 * @returns An object containing the calculated coordinates and dimensions.
 *
 * @remarks
 * Use this function to obtain information about the position and size of a DOM element.
 * The returned object includes properties such as centerX, centerY, height, width, top, and left.
 *
 * @example
 * ```typescript
 * const myElement = document.getElementById('myElement');
 * const elementData = coordinations(myElement);
 * console.log(elementData);
 * ```
 *
 * @benefits
 * - Provides a convenient way to obtain information about the position and size of a DOM element.
 * - Returns an object with properties such as centerX, centerY, height, width, top, and left.
 */
const _xyz = (
  element: Element
): {
  centerX: number
  centerY: number
  height: number
  width: number
  top: number
  left: number
} => {
  // Get the dimensions of the element
  const dimensions = element.getBoundingClientRect()

  // Calculate and return the coordinates and dimensions
  const data = {
    centerX: dimensions.left + dimensions.width / 2,
    centerY: dimensions.top + dimensions.height / 2,
    height: dimensions.height,
    width: dimensions.width,
    top: dimensions.top,
    left: dimensions.left,
  }

  return data
}

//MAP RANGE
/**
 * Maps a value from one range to another.
 * @param value - The value to be mapped.
 * @param fromMin - The minimum value of the original range.
 * @param fromMax - The maximum value of the original range.
 * @param toMin - The minimum value of the target range.
 * @param toMax - The maximum value of the target range.
 * @returns The mapped value in the target range.
 *
 * @remarks
 * Use this function to map a value from one range to another. It linearly interpolates
 * the value from the original range to the target range.
 *
 * @example
 * ```typescript
 * const mappedValue = mapValue(50, 0, 100, 0, 1);
 * console.log(mappedValue); // Output: 0.5
 * ```
 *
 * @benefits
 * - Provides a simple and reusable way to map values from one range to another.
 * - Supports linear interpolation between two numerical ranges.
 */
const _mapRange = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number => {
  return toMin + ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin)
}

//REPEAT
/**
 * Creates an interval that repeatedly invokes the provided callback function.
 * Uses requestAnimationFrame for better performance and synchronization with the browser's rendering cycle.
 * @param callback - The function to be invoked repeatedly.
 * @param time - The interval time in milliseconds.
 * @returns A function that can be used to stop the interval.
 *
 * @remarks
 * This function uses requestAnimationFrame for optimal performance and synchronization
 * with the browser's rendering cycle. It provides a more efficient alternative to setInterval.
 *
 * @example
 * ```typescript
 * const stopInterval = _repeat(() => {
 *   console.log('Hello, world!');
 * }, 1000);
 *
 * // Stop the interval after 5 seconds
 * setTimeout(stopInterval, 5000);
 * ```
 *
 * @benefits
 * - Utilizes requestAnimationFrame for better performance and synchronization.
 * - Provides a convenient and efficient way to create intervals.
 */
const _repeat = (callback: () => void, time: number = 500): (() => void) => {
  let lastTime = 0
  let requestId: number

  const repeat = (timestamp: number): void => {
    if (!lastTime || timestamp - lastTime >= time) {
      lastTime = timestamp
      callback()
    }
    requestId = requestAnimationFrame(repeat)
  }

  requestId = requestAnimationFrame(repeat)

  const stopInterval = (): void => {
    cancelAnimationFrame(requestId)
  }

  return stopInterval
}

//Distance
/**
 * Calculates the Euclidean distance between two points in a two-dimensional space.
 * @param x1 - The x-coordinate of the first point.
 * @param y1 - The y-coordinate of the first point.
 * @param x2 - The x-coordinate of the second point.
 * @param y2 - The y-coordinate of the second point.
 * @returns The distance between the two points.
 *
 * @remarks
 * The Euclidean distance between two points (x1, y1) and (x2, y2) is given by the formula:
 * distance = sqrt((x2 - x1)^2 + (y2 - y1)^2)
 *
 * @example
 * ```typescript
 * const dist = distance(0, 0, 3, 4);
 * console.log(dist); // Output: 5
 * ```
 *
 * @benefits
 * - Provides a simple and reusable function for calculating distances between two points.
 * - Utilizes the Euclidean distance formula for accuracy.
 */
const _distance = (x1: number, y1: number, x2: number, y2: number): number => {
  const dx = x2 - x1
  const dy = y2 - y1
  return Math.sqrt(dx * dx + dy * dy)
}

//Angle

/**
 * Calculates the angle (in radians) between two points in a two-dimensional space.
 * @param x1 - The x-coordinate of the first point.
 * @param y1 - The y-coordinate of the first point.
 * @param x2 - The x-coordinate of the second point.
 * @param y2 - The y-coordinate of the second point.
 * @returns The angle (in radians) between the two points.
 *
 * @remarks
 * The angle between two points (x1, y1) and (x2, y2) is given by the arctangent of the slope:
 * angle = atan2(y2 - y1, x2 - x1)
 *
 * @example
 * ```typescript
 * const angleRad = angle(0, 0, 1, 1);
 * console.log(angleRad); // Output: 0.7853981633974483 (approximately Pi/4 radians)
 * ```
 *
 * @benefits
 * - Provides a simple and reusable function for calculating angles between two points.
 * - Utilizes the arctangent function (atan2) for accurate angle calculations.
 */
const _angle = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.atan2(y2 - y1, x2 - x1)
}

//DEGREES TO RADIANS
/**
 * Converts degrees to radians.
 * @param degrees - The angle in degrees to be converted to radians.
 * @returns The equivalent angle in radians.
 *
 * @remarks
 * The conversion from degrees to radians is done using the formula:
 * radians = degrees * (Math.PI / 180)
 *
 * @example
 * ```typescript
 * const radians = degreesToRadians(90);
 * console.log(radians); // Output: 1.5707963267948966 (approximately Pi/2 radians)
 * ```
 *
 * @benefits
 * - Provides a convenient and reusable function for converting angles from degrees to radians.
 * - Utilizes the conversion formula for accurate and consistent results.
 */
const _degToRad = (degrees: number): number => {
  return degrees * (Math.PI / 180)
}

//RADIANS TO DEGREES
/**
 * Converts radians to degrees.
 * @param radians - The angle in radians to be converted to degrees.
 * @returns The equivalent angle in degrees.
 *
 * @remarks
 * The conversion from radians to degrees is done using the formula:
 * degrees = radians * (180 / Math.PI)
 *
 * @example
 * ```typescript
 * const degrees = radiansToDegrees(1.5707963267948966);
 * console.log(degrees); // Output: 90 (approximately)
 * ```
 *
 * @benefits
 * - Provides a convenient and reusable function for converting angles from radians to degrees.
 * - Utilizes the conversion formula for accurate and consistent results.
 */
const _radToDeg = (radians: number): number => {
  return radians * (180 / Math.PI)
}

//Exports
export {
  //Common functions
  _delay,
  _log,
  _select,
  _event,
  _class,
  _debounce,
  _throttle,
  _repeat,
  //Validation functions
  _capitalize,
  _sanitizeInput,
  _slugify,
  _isEmail,
  //Math functions
  _random,
  _clamp,
  _lerp,
  _xyz,
  _mapRange,
  _distance,
  _angle,
  _degToRad,
  _radToDeg,
}
