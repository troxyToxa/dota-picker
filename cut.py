from PIL import Image
import os

# --- НАЛАШТУВАННЯ ---
TARGET_WIDTH = 256   # Бажана ширина іконки в пікселях
TARGET_HEIGHT = 455  # Бажана висота іконки в пікселях (вертикальний формат)

INPUT_FOLDER = 'input'   # Папка поруч зі скриптом, куди ти кидаєш картинки
OUTPUT_FOLDER = 'output' # Папка поруч зі скриптом, куди збережуться результати

if not os.path.exists(OUTPUT_FOLDER):
    os.makedirs(OUTPUT_FOLDER)

valid_extensions = ('.png', '.jpg', '.jpeg', '.bmp', '.gif')

for filename in os.listdir(INPUT_FOLDER):
    if filename.lower().endswith(valid_extensions):
        try:
            with Image.open(os.path.join(INPUT_FOLDER, filename)) as img:
                img = img.convert("RGBA")
                
                orig_width, orig_height = img.size
                
                # Обчислюємо цільове співвідношення сторін
                target_ratio = TARGET_WIDTH / TARGET_HEIGHT
                orig_ratio = orig_width / orig_height

                # Визначаємо зону обрізки (Crop) під потрібні пропорції
                if orig_ratio > target_ratio:
                    # Картинка занадто широка — обрізаємо боки (зліва і справа)
                    new_width = int(orig_height * target_ratio)
                    new_height = orig_height
                    left = (orig_width - new_width) // 2
                    top = 0
                    right = left + new_width
                    bottom = orig_height
                else:
                    # Картинка занадто висока — обрізаємо зверху і знизу
                    new_width = orig_width
                    new_height = int(orig_width / target_ratio)
                    left = 0
                    top = (orig_height - new_height) // 2
                    right = orig_width
                    bottom = top + new_height

                # Обрізаємо зайве
                cropped_img = img.crop((left, top, right, bottom))

                # Змінюємо розмір до точних пікселів іконки
                final_icon = cropped_img.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)

                # Зберігаємо результат
                output_filename = os.path.splitext(filename)[0] + '_rect_icon.png'
                final_icon.save(os.path.join(OUTPUT_FOLDER, output_filename), "PNG")
                print(f"Оброблено та обрізано: {output_filename}")

        except Exception as e:
            print(f"Помилка з файлом {filename}: {e}")

print("Готово!")