import React from "react";
// Import the Editor component from the TinyMCE React integration
import { Editor } from "@tinymce/tinymce-react";
// Import the Controller component from React Hook Form
// Controller is used to wrap third-party controlled components (like TinyMCE)
// and connect them to React Hook Form's state and validation.
import { Controller } from "react-hook-form";
import conf from "../conf/conf"; // Import conf to get API key

// Export the component directly (no forwardRef needed here as Controller handles it)
export default function RTE({
  name, // Name for this field in React Hook Form data
  control, // The 'control' object provided by RHF's useForm() hook
  label, // Optional label text
  defaultValue = "", // Default content for the editor
}) {
  return (
    <div className="w-full">
      {/* Conditionally render the label */}
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      {/* Use Controller to integrate TinyMCE with React Hook Form */}
      <Controller
        name={name || "content"} // Field name in RHF data (defaults to "content")
        control={control} // Pass the control object from useForm()
        // The 'render' prop receives an object with 'field' properties ({ onChange, onBlur, value, ref })
        // We primarily need 'onChange' here to update RHF's state when the editor content changes.
        render={({ field: { onChange } }) => (
          // Render the TinyMCE Editor component
          <Editor
            // Pass your TinyMCE API key here
            apiKey={conf.tinymceApiKey}
            // Set the initial content value
            initialValue={defaultValue}
            // Configuration object for TinyMCE
            init={{
              initialValue: defaultValue, // Set initial value again (good practice)
              height: 500, // Editor height
              menubar: true, // Show the menu bar (File, Edit, etc.)
              // List of plugins to enable
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              // Configuration for the toolbar buttons
              toolbar:
                "undo redo | blocks | bold italic forecolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help | image",
              // CSS styles applied inside the editor's content area
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              // Add image upload configuration here later if needed
            }}
            // Crucial part: When the editor's content changes...
            // ...call the 'onChange' function provided by the Controller's 'field' object.
            // This updates the value associated with this field ('name') in React Hook Form's state.
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
