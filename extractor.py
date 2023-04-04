import tkinter as tk
import cssutils
import ast
import json
# Create the main window
root = tk.Tk()

# Set the window title
root.title("CSS Compiler")

# Create a label for the single line input
single_label = tk.Label(root, text="CSS Values:")
single_label.pack()

# Create a single line input section
single_input = tk.Entry(root)
single_input.pack()

# Create a label for the multiline input
multi_label = tk.Label(root, text="Minified CSS:")
multi_label.pack()

# Create a multiline input section
multi_input = tk.Text(root)
multi_input.pack()


# Create a button to compile the CSS
def compile_css():
  # Get the values from the input sections
  css_values = single_input.get()
  minified_css = multi_input.get("1.0", tk.END)

  # declare class name
  class_names = ast.literal_eval(css_values)

  stylesheet = cssutils.parseString(minified_css)

  # Find the rule sets that match each class
  class_rules = {}

  for class_name in class_names:
    class_rules[class_name] = []

    for rule in stylesheet:
      if rule.type == rule.STYLE_RULE:
        for selector in rule.selectorList:
          if selector.selectorText == class_name:
            class_rules[class_name].append(rule)

  # Extract the property values for each class
  class_properties = {}

  for class_name, rules in class_rules.items():
    class_properties[class_name] = {}

    for rule in rules:
      for prop in rule.style:
        class_properties[class_name][prop.name] = prop.value

  # Print the extracted values for each class
  for class_name, properties in class_properties.items():
    compiled_css = properties
    print(compiled_css)

  # Update the output box
  output_box.config(text=compiled_css)


compile_button = tk.Button(root, text="Compile", command=compile_css)
compile_button.pack()

# Create a box to display the compiled CSS
output_box = tk.Label(root,
                      text="Hello World",
                      bg="white",
                      width=50,
                      height=10,
                      padx=10,
                      pady=10)
output_box.pack()

# Run the main event loop
root.mainloop()
