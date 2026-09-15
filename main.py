import json
import os

if __name__ == "__main__":
    folder_path = "src/task_tracker/json_data/"
    file_path = os.path.join(folder_path, "json_data.json")
    from src.task_tracker import main

    if not os.path.isfile(file_path):
        initial_data = {}
        with open(file_path, "w") as file:
            json.dump(initial_data, file)

    main()
