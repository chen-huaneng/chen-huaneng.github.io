---
date: '2024-10-11 21:20:13'
title: 'Java Faq'
description: ""
tags: [[Java]]
categories: [[Java]]
math: false
---

# Q&A

##  Compile and Execution

- [Java Compiling and Running Process | by amirreza lotfi | Javarevisited | Medium](https://medium.com/javarevisited/how-java-code-compiled-and-run-e4702fb83ffa)
- [Compilation and Execution of a Java Program - GeeksforGeeks](https://www.geeksforgeeks.org/compilation-execution-java-program/)
- [What are the things are checked at compile time by Java? - Quora](https://www.quora.com/What-are-the-things-are-checked-at-compile-time-by-Java)

## Different behaviour in JShell

Question:

1. Why when execute `int a;` ,the variable `a` was initialized to `0` rather than compile error?

Answer:

- [java - Different behaviour of same statement while executing on JShell - Stack Overflow](https://stackoverflow.com/questions/49585003/different-behaviour-of-same-statement-while-executing-on-jshell)
- [JEP 222: jshell: The Java Shell (Read-Eval-Print Loop) (openjdk.org)](https://openjdk.org/jeps/222#Snippets)
- [JEP 222: jshell: The Java Shell (Read-Eval-Print Loop) (openjdk.org)](https://openjdk.org/jeps/222#State)

## Memory usage

### Objects

Question: 

1. How many memory usage of objects in java?

Answer:

- [Memory usage of objects in Java (javamex.com)](https://www.javamex.com/tutorials/memory/)
- [How to calculate the memory usage of Java objects (javamex.com)](https://www.javamex.com/tutorials/memory/object_memory_usage.shtml)
- [Memory Usage Estimation in Java | Better Programmer (kiyanpro.com)](http://blog.kiyanpro.com/2016/10/07/system_design/memory-usage-estimation-in-java/)

## Conversion

### Primitive Conversion

Question:

1. What is conversion between primitive like char, int, float, double…?

Answer:

- [Chapter 5. Conversions and Contexts (oracle.com)](https://docs.oracle.com/javase/specs/jls/se8/html/jls-5.html) Widening and Narrowing

### Autoboxing and Unboxing

Question:

3. What is autoboxing?

Answer:

- [Autoboxing and Unboxing (The Java™ Tutorials > Learning the Java Language > Numbers and Strings) (oracle.com)](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html)
- Also see the `5.4 Object Wrappers and Autoboxing` of `Core-Java-Volume-I-Fundamentals-12th-Edition-Cay-S.-Horstmann` 

Question:

4. What will happen if i use `==` to compare two `Integer` ?

Answer:

- [How can I properly compare two Integers in Java? - Stack Overflow](https://stackoverflow.com/questions/1514910/how-can-i-properly-compare-two-integers-in-java)
- [Chapter 5. Conversions and Contexts (oracle.com)](https://docs.oracle.com/javase/specs/jls/se8/html/jls-5.html#jls-5.1.7)
- [Integer (Java Platform SE 8 ) (oracle.com)](https://docs.oracle.com/javase/8/docs/api/java/lang/Integer.html#valueOf-int-)
- [Java gotchas - OWASP](https://wiki.owasp.org/index.php/Java_gotchas#Immutable_Objects_.2F_Wrapper_Class_Caching)
- [Java Integer Cache - GeeksforGeeks](https://www.geeksforgeeks.org/java-integer-cache/)
- [When 1 + 1 = 3 (pedrorijo.com)](https://pedrorijo.com/blog/java-integer-cache/)
- Also see the `5.4 Object Wrappers and Autoboxing` of `Core-Java-Volume-I-Fundamentals-12th-Edition-Cay-S.-Horstmann`  
- [The Geeky Way – Java: Autoboxing and -XX:AutoBoxCacheMax](https://www.thegeekyway.com/java-autoboxing-xxautoboxcachemax/)
- Also see the `private static class IntegerCache` in the `Integer.java` source code.
- [Java Integer Cache - Javapapers](https://javapapers.com/java/java-integer-cache/)——*The better one*
- [What is Autoboxing and Unboxing in Java ? Example, Tutorial and Corner cases (javarevisited.blogspot.com)](https://javarevisited.blogspot.com/2012/07/auto-boxing-and-unboxing-in-java-be.html)
- [Java - Integer Cache - Abel's Blog (chen-huaneng.github.io)](https://chen-huaneng.github.io/2023/12/04/2023-12-4-2023-12-04-java-integer-cache/)

Note:

In the source code `Integer.java`, there are a `private static class IntegerCache` to cache the `Integer` in range of -128 and 127. You can modify the range on command-line option like `java -XX:AutoBoxCacheMax=1000 YOURCLASSNAME` which will cache `Integer` range -128 to 1000 rather than the default. 

How to using `-XX:AutoBoxCachMax=<size>` to change the cache range.

> @Source [Java’s -XX:+AggressiveOpts: Can it slow you down? (opsian.com)](https://www.opsian.com/blog/aggressive-opts/)
>
> #### AutoBoxCacheMax
>
> For those less familiar with Java, [AutoBoxing](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html) is where the compiler automatically converts between primitive and boxed types. E.g `int` and `Integer`. Autoboxing is mostly a code readability feature without which there would need to be a lot more casting when mixing primitives and boxed types.
>
> Boxing integers repeatedly can be expensive and since Java’s boxed types are immutable there exists a cache where a configurable range of values are pre-allocated and calls to create one (via `Integer.valueOf` for example) actually result in a reference to a cached object. Intuitively the mostly commonly used boxed numbers in an application often fall within a common range for example 1-10.
>
> Savvy readers will realise this means that some equal pairs of Integer objects have reference equality (`==`) and others don’t. You should always use the `.equals()` method when comparing boxes numeric types in Java.
>
> Byte, Integer and Long all support caching between -128 and 127 but the upper limit of Integers cache is configurable via AutoBoxCacheMax. AggressiveOpts sets the AutoBoxCacheMax to 20000 which means all Integers between -128 and 20000 are cached. 

Why caching this range.

> @Source [The Geeky Way – Java: Autoboxing and -XX:AutoBoxCacheMax](https://www.thegeekyway.com/java-autoboxing-xxautoboxcachemax/)
>
> **Why caching this range :**
>
> This short range are generally used and  performance of
>
> **_public static valueOf( i)_**
>
> as this method is likely to yield significantly better space and time performance by caching frequently requested values.
>
> **Max size of -XX:AutoBoxCacheMax ;**
>
> Max cache size can't be more than -Xmx (which is JVM heap size) . Heap size is defined by vm argument -Xmxm .  
> But, you as soon as JVM initialized, it allocate the memory for caching purpose. But you can't allocate whole (-Xmx in byte)/4 (4byte is size of  int) for AutoBoxCache because of other object needed to be loaded and you might end up with
>
> _java.lang.OutOfMemoryError: Java heap space_
>
> Also, note that for other wrapper classes except Integer , have fixed caching size upto 127 only.

Other wrapper type also have cache mechanism.

> @Source [Java gotchas - OWASP](https://wiki.owasp.org/index.php/Java_gotchas#Immutable_Objects_.2F_Wrapper_Class_Caching)
>
> The other wrapper classes (Byte, Short, Long, Character) also contain this caching mechanism. The Byte, Short and Long all contain the same caching principle to the Integer object. The Character class caches from 0 to 127. The negative cache is not created for the Character wrapper as these values do not represent a corresponding character. There is no caching for the Float object.
>
> BigDecimal also uses caching but uses a different mechanism. While the other objects contain a inner class to deal with caching this is not true for BigDecimal, the caching is pre-defined in a static array and only covers 11 numbers, 0 to 10:

```java
// Cache of common small BigDecimal values.
private static final BigDecimal zeroThroughTen[] = {
new BigDecimal(BigInteger.ZERO,		0,  0),
new BigDecimal(BigInteger.ONE,		1,  0),
new BigDecimal(BigInteger.valueOf(2),	2,  0),
new BigDecimal(BigInteger.valueOf(3),	3,  0),
new BigDecimal(BigInteger.valueOf(4),	4,  0),
new BigDecimal(BigInteger.valueOf(5),	5,  0),
new BigDecimal(BigInteger.valueOf(6),	6,  0),
new BigDecimal(BigInteger.valueOf(7),	7,  0),
new BigDecimal(BigInteger.valueOf(8),	8,  0),
new BigDecimal(BigInteger.valueOf(9),	9,  0),
new BigDecimal(BigInteger.TEN,		10, 0),
};
```

Cache only for autoboxing rather than built using constructor.

> @Source [Java Integer Cache - GeeksforGeeks](https://www.geeksforgeeks.org/java-integer-cache/)
>
> **Java Integer Cache Implementation:**
>
> In Java 5, a new feature was introduced to save the memory and improve performance for Integer type objects handling. Integer objects are cached internally and reused via the same referenced objects.
>
> - This is applicable for Integer values in the range between –128 to +127.
> - **This Integer caching works only on auto-boxing. Integer objects will not be cached when they are built using the constructor.**

```java
int i = 3;
Integer j = 3;
Integer k = new Integer(3);
i == j // true because Integer unboxing into int
i == k // true because the same reason above
j == k // false because Integer objects will not be cached when they are built using the constructor. 
```

_And do not using constructor to new Integer object, but using autoboxing, because the constructor is deprecated and marked for removal._

> @Source [Integer (Java Platform SE 8 ) (oracle.com)](https://docs.oracle.com/javase/8/docs/api/java/lang/Integer.html#valueOf-int-)
>
> Returns an `Integer` instance representing the specified `int` value. If a new `Integer` instance is not required, this method should generally be used in preference to the constructor [`Integer(int)`](https://docs.oracle.com/javase/8/docs/api/java/lang/Integer.html#Integer-int-), as this method is likely to yield significantly better space and time performance by caching frequently requested values. This method will always cache values in the range -128 to 127, inclusive, and may cache other values outside of this range.

The history of Integer cache and why is -128 to 127.

>@Source [Java Integer Cache - Javapapers](https://javapapers.com/java/java-integer-cache/)
>
>Actually when this feature was first introduced in Java 5, the range was fixed to –127 to +127. Later in Java 6, the high end of the range was mapped to java.lang.Integer.IntegerCache.high and a VM argument allowed us to set the high number. Which has given flexibility to tune the performance according to our application use case. What is should have been the reason behind choosing this range of numbers from –127 to 127. This is conceived to be the widely most range of integer numbers. The first usage of Integer in a program has to take that extra amount of time to cache the instances.

And more for Integer Cache from `Java Language Specification(JLS)`. 

> @Source [Chapter 5. Conversions and Contexts (oracle.com)](https://docs.oracle.com/javase/specs/jls/se8/html/jls-5.html#jls-5.1.7)
>
> If the value `p` being boxed is an integer literal of type `int` between `-128` and `127` inclusive ([§3.10.1](https://docs.oracle.com/javase/specs/jls/se8/html/jls-3.html#jls-3.10.1 "3.10.1. Integer Literals")), or the boolean literal `true` or `false` ([§3.10.3](https://docs.oracle.com/javase/specs/jls/se8/html/jls-3.html#jls-3.10.3 "3.10.3. Boolean Literals")), or a character literal between `'\u0000'` and `'\u007f'` inclusive ([§3.10.4](https://docs.oracle.com/javase/specs/jls/se8/html/jls-3.html#jls-3.10.4 "3.10.4. Character Literals")), then let `a` and `b` be the results of any two boxing conversions of `p`. It is always the case that `a` `==` `b`.
>
> Ideally, boxing a primitive value would always yield an identical reference. In practice, this may not be feasible using existing implementation techniques. The rule above is a pragmatic compromise, requiring that certain common values always be boxed into indistinguishable objects. The implementation may cache these, lazily or eagerly. For other values, the rule disallows any assumptions about the identity of the boxed values on the programmer's part. This allows (but does not require) sharing of some or all of these references. Notice that integer literals of type `long` are allowed, but not required, to be shared.
>
> This ensures that in most common cases, the behavior will be the desired one, without imposing an undue performance penalty, especially on small devices. Less memory-limited implementations might, for example, cache all `char` and `short` values, as well as `int` and `long` values in the range of -32K to +32K.
>
> A boxing conversion may result in an `OutOfMemoryError` if a new instance of one of the wrapper classes (`Boolean`, `Byte`, `Character`, `Short`, `Integer`, `Long`, `Float`, or `Double`) needs to be allocated and insufficient storage is available.

## More details about Java

Question:

1. What will happen if the supertypes of a class or interface provide multiple default methods with the same signature?

Answer:

> @Source: [Overriding and Hiding Methods (The Java™ Tutorials > Learning the Java Language > Interfaces and Inheritance) (oracle.com)](https://docs.oracle.com/javase/tutorial/java/IandI/override.html)
>
> ## Interface Methods
>
> [Default methods](https://docs.oracle.com/javase/tutorial/java/IandI/defaultmethods.html) and [abstract methods](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html) in interfaces are inherited like instance methods. However, when the supertypes of a class or interface provide multiple default methods with the same signature, the Java compiler follows inheritance rules to resolve the name conflict. These rules are driven by the following two principles:
>
> - Instance methods are preferred over interface default methods.
>
>   Consider the following classes and interfaces:
>
>   ```java
>   public class Horse {
>       public String identifyMyself() {
>           return "I am a horse.";
>       }
>   }
>   ```
>
>   ```java
>   public interface Flyer {
>       default public String identifyMyself() {
>           return "I am able to fly.";
>       }
>   }
>   ```
>
>   ```java
>   public interface Mythical {
>       default public String identifyMyself() {
>           return "I am a mythical creature.";
>       }
>   }
>   ```
>
>   ```java
>   public class Pegasus extends Horse implements Flyer, Mythical {
>       public static void main(String... args) {
>           Pegasus myApp = new Pegasus();
>           System.out.println(myApp.identifyMyself());
>       }
>   }
>   ```
>
>   The method `Pegasus.identifyMyself` returns the string `I am a horse.`
>
> - Methods that are already overridden by other candidates are ignored. This circumstance can arise when supertypes share a common ancestor.
>
>   Consider the following interfaces and classes:
>
>   ```java
>   public interface Animal {
>       default public String identifyMyself() {
>           return "I am an animal.";
>       }
>   }
>   ```
>
>   ```java
>   public interface EggLayer extends Animal {
>       default public String identifyMyself() {
>           return "I am able to lay eggs.";
>       }
>   }
>   ```
>
>   ```java
>   public interface FireBreather extends Animal { }
>   ```
>
>   ```java
>   public class Dragon implements EggLayer, FireBreather {
>       public static void main (String... args) {
>           Dragon myApp = new Dragon();
>           System.out.println(myApp.identifyMyself());
>       }
>   }
>   ```
>
>   The method `Dragon.identifyMyself` returns the string `I am able to lay eggs.`
>
> If two or more independently defined default methods conflict, or a default method conflicts with an abstract method, then the Java compiler produces a compiler error. You must explicitly override the supertype methods.
>
> Consider the example about computer-controlled cars that can now fly. You have two interfaces (`OperateCar` and `FlyCar`) that provide default implementations for the same method, (`startEngine`):
>
> ```java
> public interface OperateCar {
>     // ...
>     default public int startEngine(EncryptedKey key) {
>         // Implementation
>     }
> }
> public interface FlyCar {
>     // ...
>     default public int startEngine(EncryptedKey key) {
>         // Implementation
>     }
> }
> ```
>
> A class that implements both `OperateCar` and `FlyCar` must override the method `startEngine`. You could invoke any of the of the default implementations with the `super` keyword.
>
> ```java
> public class FlyingCar implements OperateCar, FlyCar {
>     // ...
>     public int startEngine(EncryptedKey key) {
>         FlyCar.super.startEngine(key);
>         OperateCar.super.startEngine(key);
>     }
> }
> ```
>
> The name preceding `super` (in this example, `FlyCar` or `OperateCar`) must refer to a direct superinterface that defines or inherits a default for the invoked method. This form of method invocation is not restricted to differentiating between multiple implemented interfaces that contain default methods with the same signature. You can use the `super` keyword to invoke a default method in both classes and interfaces.
>
> Inherited instance methods from classes can override abstract interface methods. Consider the following interfaces and classes:
>
> ```java
> public interface Mammal {
>     String identifyMyself();
> }
> public class Horse {
>     public String identifyMyself() {
>         return "I am a horse.";
>     }
> }
> public class Mustang extends Horse implements Mammal {
>     public static void main(String... args) {
>         Mustang myApp = new Mustang();
>         System.out.println(myApp.identifyMyself());
>     }
> }
> ```
>
> The method `Mustang.identifyMyself` returns the string `I am a horse.` The class `Mustang` inherits the method `identifyMyself` from the class `Horse`, which overrides the abstract method of the same name in the interface `Mammal`.
>
> **Note**: Static methods in interfaces are never inherited.
>
> ## Modifiers
>
> The access specifier for an overriding method can allow more, but not less, access than the overridden method. For example, a protected instance method in the superclass can be made public, but not private, in the subclass.
>
> You will get a compile-time error if you attempt to change an instance method in the superclass to a static method in the subclass, and vice versa.
>
> ## Summary
>
> The following table summarizes what happens when you define a method with the same signature as a method in a superclass.
>
> |                          | Superclass Instance Method     | Superclass Static Method       |
> | ------------------------ | ------------------------------ | ------------------------------ |
> | Subclass Instance Method | Overrides                      | Generates a compile-time error |
> | Subclass Static Method   | Generates a compile-time error | Hides                          |
>
> ------
>
> **Note:** In a subclass, you can overload the methods inherited from the superclass. Such overloaded methods neither hide nor override the superclass instance methods—they are new methods, unique to the subclass.



Question:

2. Why does adding a String and int take effect?

Answer:

- [java - Why does adding a String and an int act this way? - Stack Overflow](https://stackoverflow.com/questions/11651689/why-does-adding-a-string-and-an-int-act-this-way)
- [Chapter 15. Expressions (oracle.com)](https://docs.oracle.com/javase/specs/jls/se8/html/jls-15.html#jls-15.18.1)
- [String (Java SE 17 & JDK 17) (oracle.com)](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html)
- [String (Java Platform SE 8 ) (oracle.com)](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html)


### Overload vs Override, Dynamic binding vs Static binding, Declared type vs Actual type

#### Myself understanding and note in this topic

##### Why Java have Dynamic binding and Static binding?

According to  the article of [What is Static and Dynamic binding in Java with Example (javarevisited.blogspot.com)](https://javarevisited.blogspot.com/2012/03/what-is-static-and-dynamic-binding-in.html)

>If you have more than one method of the same name ([method overriding](http://javarevisited.blogspot.com/2011/12/method-overloading-vs-method-overriding.html)) or two variables of the same name in the same class hierarchy it gets tricky to find out which one is used during runtime as a result of their reference in code. This problem is resolved using _static and dynamic binding in Java_. For those who are not familiar with the binding operation, its process is used to a link which method or variable to be called as a result of their reference in code.

> _The difference between static and dynamic binding_ is a [popular Java programming interview question](http://javarevisited.blogspot.com/2011/04/top-20-core-java-interview-questions.html) that tries to explore candidates' knowledge on having compiler and [JVM](http://javarevisited.blogspot.com/2011/12/jre-jvm-jdk-jit-in-java-programming.html) finds which methods to call if there is more than one method of the same name as it's the case in method overloading and overriding.

So, in order to solve above problems, Java introduce the dynamic/run-time binding and static/compile binding. And we also known that Java execute compile before interpret, so compile-time is earlier than run-time. For example, in command-line, we have

```shell
javac Animal.java # which call the java compile
java Animal # which means java interpret
```

and that's why **JVM** first using static binding and then check for dynamic binding.

##### What are declared type and actual type?

First of all, we should know what is declared type and actual type. An example is

```java
public static void callEat(Animal animal) {
    System.out.println("Animal is eating");
}

public static void callEat(Dog dog) {
    System.out.println("Dog is eating");
}

public static void main(String args[])
{
    Animal a = new Dog();
    callEat(a);
}
```

which `Animal` is the declared type and `Dog` is the actual type of `a`. 

##### What is the difference between Override and Overload?

Before we introduce dynamic binding and static binding, we first come to see what is override and overload, according to [Defining Methods (The Java™ Tutorials > Learning the Java Language > Classes and Objects) (oracle.com)](https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html) and [Overriding and Hiding Methods (The Java™ Tutorials > Learning the Java Language > Interfaces and Inheritance) (oracle.com)](https://docs.oracle.com/javase/tutorial/java/IandI/override.html):

> # Overloading Methods
>
> The Java programming language supports _overloading_ methods, and Java can distinguish between methods with different _method signatures_. This means that methods within a class can have the same name if they have different parameter lists.
>
> # Overriding and Hiding Methods
>
> ## Instance Methods
>
> An instance method in a subclass with the same signature (name, plus the number and the type of its parameters) and return type as an instance method in the superclass _overrides_ the superclass's method.
>
> The ability of a subclass to override a method allows a class to inherit from a superclass whose behavior is "close enough" and then to modify behavior as needed. The overriding method has the same name, number and type of parameters, and return type as the method that it overrides. An overriding method can also return a subtype of the type returned by the overridden method. This subtype is called a _covariant return type_.
>
> ## Static Methods
>
> If a subclass defines a static method with the same signature as a static method in the superclass, then the method in the subclass _hides_ the one in the superclass.
>
> The distinction between hiding a static method and overriding an instance method has important implications:
>
> - The version of the overridden instance method that gets invoked is the one in the subclass.
> - The version of the hidden static method that gets invoked depends on whether it is invoked from the superclass or the subclass.

##### What happen when method calls

According to `5.1.6 Understanding Method Calls` of `Core-Java-Volume-I-Fundamentals-12th-Edition-Cay-S.-Horstmann` :

> It is important to understand exactly how a method call is applied to an object. Let’s say we call x.f(args), and the implicit parameter x is declared to be an object of class C. Here is what happens: 
>
> 1. The compiler looks at the declared type of the object and the method name. Note that there may be multiple methods, all with the same name, f, but with different parameter types. For example, there may be a method f(int) and a method f(String). The compiler enumerates all methods called f in the class C and all accessible methods called f in the superclasses of C. (Private methods of the superclass are not accessible.) Now the compiler knows all possible candidates for the method to be called. 
> 2. Next, the compiler determines the types of the arguments supplied in the method call. If among all the methods called f there is a unique method whose parameter types are a best match for the supplied arguments, that method is chosen to be called. This process is called overloading resolution. For example, in a call x.f("Hello"), the compiler picks f(String) and not f(int). The situation can get complex because of type conversions (int to double, Manager to Employee, and so on). If the compiler cannot find any method with matching parameter types or if multiple methods all match after applying conversions, the compiler reports an error. Now the compiler knows the name and parameter types of the method that needs to be called
> 3. If the method is private, static, final, or a constructor, then the compiler knows exactly which method to call. (The final modifier is explained in the next section.) This is called static binding. Otherwise, the method to be called depends on the actual type of the implicit parameter, and dynamic binding must be used at runtime. In our example, the compiler would generate an instruction to call f(String) with dynamic binding. 
> 4. When the program runs and uses dynamic binding to call a method, the virtual machine must call the version of the method that is appropriate for the actual type of the object to which x refers. Let’s say the actual type is D, a subclass of C. If the class D defines a method f(String), that method is called. If not, D’s superclass is searched for a method f(String), and so on.
>
> It would be time-consuming to carry out this search every time a method is called. Instead, the virtual machine precomputes a method table for each class. The method table lists all method signatures and the actual methods to be called. 
>
> The virtual machine can build the method table after loading a class, by combining the methods that it finds in the class file with the method table of the superclass. 
>
> When a method is actually called, the virtual machine simply makes a table lookup. In our example, the virtual machine consults the method table for the class D and looks up the method to call for f(String). That method may be D.f(String) or X.f(String), where X is some superclass of D. 
>
> There is one twist to this scenario. If the call is super.f(param), then the virtual machine consults the method table of the superclass.

##### Now, let's see the mystery of the dynamic binding and static binding

*note:* overloading bind at compile time "static binding" while overriding binds at run time "dynamic binding".

To conclude:

> ## [What is Static and Dynamic binding in Java with Example (javarevisited.blogspot.com)](https://javarevisited.blogspot.com/2012/03/what-is-static-and-dynamic-binding-in.html)
>
> 1) Static binding in Java occurs during Compile time while Dynamic binding occurs during Runtime.
>
> 2) [private](http://docs.oracle.com/javase/tutorial/java/javaOO/variables.html), [final](http://javarevisited.blogspot.com/2011/12/final-variable-method-class-java.html) and [static](http://javarevisited.blogspot.com/2011/11/static-keyword-method-variable-java.html) methods and variables use static binding and are bonded by the compiler while virtual methods are bonded during runtime based upon runtime object.
>
> 3) Static binding uses Type([Class in Java](http://javarevisited.blogspot.com/2011/10/class-in-java-programming-general.html))  information for binding while Dynamic binding uses Object to resolve to bind.
>
> 4) [Overloaded methods](http://javarevisited.blogspot.com/2011/12/method-overloading-vs-method-overriding.html) are bonded using static binding while overridden methods are bonded using dynamic binding at runtime. Here is an example that will help you to understand both static and dynamic binding in Java.

#### References

Question:

1. Overloaded and overridden in Java
2. Overriding and Hiding Methods

Answer:

- [overriding - Overloaded and overridden in Java - Stack Overflow](https://stackoverflow.com/questions/10568772/overloaded-and-overridden-in-java#comment74040843_10568780)
- [Defining Methods (The Java™ Tutorials > Learning the Java Language > Classes and Objects) (oracle.com)](https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html)
- [Overriding and Hiding Methods (The Java™ Tutorials > Learning the Java Language > Interfaces and Inheritance) (oracle.com)](https://docs.oracle.com/javase/tutorial/java/IandI/override.html)

Question:

1. Overriding vs Hiding

Answer:

- [inheritance - Overriding vs Hiding Java - Confused - Stack Overflow](https://stackoverflow.com/questions/10594052/overriding-vs-hiding-java-confused)
- [Overriding and Hiding Methods (The Java™ Tutorials > Learning the Java Language > Interfaces and Inheritance) (oracle.com)](https://docs.oracle.com/javase/tutorial/java/IandI/override.html)
- [Overriding Vs Hiding (Wiki forum at Coderanch)](https://coderanch.com/wiki/659959/Overriding-Hiding)
- [Variable and Method Hiding in Java | Baeldung](https://www.baeldung.com/java-variable-method-hiding#local)

Question:

1. Dynamic binding/run-time binding vs Static binding/compile-time binding

Answer:

- [java - Static Binding and Dynamic Binding - Stack Overflow](https://stackoverflow.com/questions/16647590/static-binding-and-dynamic-binding)
- Also see `5.1.6 Understanding Method Calls` of `Core-Java-Volume-I-Fundamentals-12th-Edition-Cay-S.-Horstmann`  
- [Understanding Class Members (The Java™ Tutorials > Learning the Java Language > Classes and Objects) (oracle.com)](https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html)
- [Polymorphism (The Java™ Tutorials > Learning the Java Language > Interfaces and Inheritance) (oracle.com)](https://docs.oracle.com/javase/tutorial/java/IandI/polymorphism.html)
- [What is Static and Dynamic binding in Java with Example (javarevisited.blogspot.com)](https://javarevisited.blogspot.com/2012/03/what-is-static-and-dynamic-binding-in.html)
- [Static Vs. Dynamic Binding in Java - Stack Overflow](https://stackoverflow.com/questions/19017258/static-vs-dynamic-binding-in-java)
- [Skeleton Coder: Java Tutorials: Overloading is compile-time binding](http://skeletoncoder.blogspot.com/2006/09/java-tutorials-overloading-is-compile.html)
- [What is Static and Dynamic binding in Java with Example (javarevisited.blogspot.com)](https://javarevisited.blogspot.com/2012/03/what-is-static-and-dynamic-binding-in.html)
- [inheritance - Java dynamic binding and method overriding - Stack Overflow](https://stackoverflow.com/questions/321864/java-dynamic-binding-and-method-overriding)
- [oop - What is the difference between dynamic and static polymorphism in Java? - Stack Overflow](https://stackoverflow.com/questions/20783266/what-is-the-difference-between-dynamic-and-static-polymorphism-in-java)


Question:

1. compile-time error when calling a subclass method using superclass reference?

Answer:

- [java - Why do I get a compile-time error when calling a subclass method using superclass reference? - Stack Overflow](https://stackoverflow.com/questions/37853463/why-do-i-get-a-compile-time-error-when-calling-a-subclass-method-using-superclas)

Question:

1. Static type(not static binding)

Answer:

- [inheritance - Difference between Dynamic and Static type assignments in Java - Stack Overflow](https://stackoverflow.com/questions/20504714/difference-between-dynamic-and-static-type-assignments-in-java)


### Other Question

Question:

1. Does casting change the declared/reference type at run-time?

Answer:

- [java - Does casting change the declared/reference type at run-time? - Stack Overflow](https://stackoverflow.com/questions/17120698/does-casting-change-the-declared-reference-type-at-run-time)
- [Explicit type casting example in Java - Stack Overflow](https://stackoverflow.com/questions/20096297/explicit-type-casting-example-in-java)

Question:

1. Class hierarchy terms, ancestor- vs. parent-class

Answer:

- [oop - Class hierarchy terms, ancestor- vs. parent-class - Stack Overflow](https://stackoverflow.com/questions/10993304/class-hierarchy-terms-ancestor-vs-parent-class)

Question:

1. Is constructor a member or method of class

Answer:

- [Java: How can a constructor return a value? - Stack Overflow](https://stackoverflow.com/questions/2574276/java-how-can-a-constructor-return-a-value)
- [java "void" and "non void" constructor - Stack Overflow](https://stackoverflow.com/questions/24963718/java-void-and-non-void-constructor)
- [Chapter 8. Classes (oracle.com)](https://docs.oracle.com/javase/specs/jls/se7/html/jls-8.html#jls-8.8)
- Also see the `4.3.4 First Steps with Constructors` of `Core-Java-Volume-I-Fundamentals-12th-Edition-Cay-S.-Horstmann`  

Question:

2. The sequence of constructor was invoked when subclass object is constructed?

Answer:

- Also see the `5.1.3 Subclass Constructors` of `Core-Java-Volume-I-Fundamentals-12th-Edition-Cay-S.-Horstmann`  


Quesrion:

1. What is the difference between `==` and `java.lang.Object.equals()`?

Answer:

- [identity - What is the difference between == and equals() in Java? - Stack Overflow](https://stackoverflow.com/questions/7520432/what-is-the-difference-between-and-equals-in-java/7520464#7520464)
- [Object (Java SE 17 & JDK 17) (oracle.com)](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object))

Question:

1. How do I compare Strings in Java?

Answer:

- [How do I compare strings in Java? - Stack Overflow](https://stackoverflow.com/questions/513832/how-do-i-compare-strings-in-java)
- [How can I compare two strings in java and define which of them is smaller than the other alphabetically? - Stack Overflow](https://stackoverflow.com/questions/5153496/how-can-i-compare-two-strings-in-java-and-define-which-of-them-is-smaller-than-t)

Qusetion:

1. How to check if object is null or not?

Answer:

- [java - How to check if object is null or not except == null - Stack Overflow](https://stackoverflow.com/questions/25642585/how-to-check-if-object-is-null-or-not-except-null)
- [Objects (Java Platform SE 8 ) (oracle.com)](https://docs.oracle.com/javase/8/docs/api/java/util/Objects.html#isNull-java.lang.Object-)

Question:

1. Is java pass-by-value or pass-by-reference

Answer:

- [Java is Pass-by-Value, Dammit! | JavaDude.com](https://www.javadude.com/articles/passbyvalue.htm)
- [methods - Is Java "pass-by-reference" or "pass-by-value"? - Stack Overflow](https://stackoverflow.com/questions/40480/is-java-pass-by-reference-or-pass-by-value/73021#73021)
- [language agnostic - What's the difference between passing by reference vs. passing by value? - Stack Overflow](https://stackoverflow.com/questions/373419/whats-the-difference-between-passing-by-reference-vs-passing-by-value/430958#430958)
- Also see the `4.5 Method Parameters` of `Core-Java-Volume-I-Fundamentals-12th-Edition-Cay-S.-Horstmann`  

Question:

1. What is reference type and value type in Java?

Answer:

- [Value type and reference type - Wikipedia](https://en.wikipedia.org/wiki/Value_type_and_reference_type)
- Also see the `2.1 Mystery of the Walrus` of [2.1 Mystery of the Walrus · Hug61B (gitbooks.io)](https://joshhug.gitbooks.io/hug61b/content/chap2/chap21.html)
- [java - What's the difference between primitive and reference types? - Stack Overflow](https://stackoverflow.com/questions/8790809/whats-the-difference-between-primitive-and-reference-types)



Question:

1. How to call object member in static method

Answer:

- [Static method in java - Stack Overflow](https://stackoverflow.com/questions/2392028/static-method-in-java)
- [java - objects - calling object instance inside a static method - Stack Overflow](https://stackoverflow.com/questions/46860422/objects-calling-object-instance-inside-a-static-method)

Question: 

1. Hiding vs Shadow

Answer:

- [Difference in Method Overloading, Overriding, Hiding, Shadowing and Obscuring in Java and Object-Oriented Programming? | Java67](https://www.java67.com/2019/04/difference-between-overloading-overriding-hiding-shadowing-and-obscuring-in-java-oop.html)
- [Variable Hiding and Variable Shadowing in Java - Scaler Topics](https://www.scaler.com/topics/java/variable-hiding-and-variable-shadowing-in-java/)

Question:

1. Interface vs Abstract Class

Answer:

- [java - How should I have explained the difference between an Interface and an Abstract class? - Stack Overflow](https://stackoverflow.com/questions/18777989/how-should-i-have-explained-the-difference-between-an-interface-and-an-abstract)
- Also see the `6.1.3 Interfaces and Abstract Classes` of `Core-Java-Volume-I-Fundamentals-12th-Edition-Cay-S.-Horstmann`  

Question:

1. How to convert String into double?

Answer:

- [Convert String to double in Java - Stack Overflow](https://stackoverflow.com/questions/5769669/convert-string-to-double-in-java)

Question:

1. Why does accessing an array element take constant time?

Answer:

- [Why does accessing an array element take constant time? - Quora](https://www.quora.com/Why-does-accessing-an-array-element-take-constant-time)


## Style about Java

Question:

4. Is calling static methods via an object "bad form"?

Answer:

- [java - Is calling static methods via an object "bad form"? Why? - Stack Overflow](https://stackoverflow.com/questions/7884004/is-calling-static-methods-via-an-object-bad-form-why)


Question: 

1. When to use `var` in Java ?

Answer:

- [Local Variable Type Inference: Style Guidelines (archive.org)](https://web.archive.org/web/20211013201458/https://openjdk.java.net/projects/amber/LVTIstyle.html)
- Also see the `4.3.5 Declaring Local Variables with var` and `6.3.6 Anonymous Inner Classes` of `Core-Java-Volume-I-Fundamentals-12th-Edition-Cay-S.-Horstmann`  

