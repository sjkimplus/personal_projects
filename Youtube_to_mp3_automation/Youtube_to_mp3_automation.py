import os
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


# where the selenium is located in
os.environ['PATH'] += r":/Users/sungjukim/desktop/PP/SeleniumD" # 'r' = raw string literal in python
driver = webdriver.Chrome()

# list of urls to download
urls = ['https://www.youtube.com/watch?v=NKEhdsnKKHs&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=2&pp=iAQB',
		'https://www.youtube.com/watch?v=7e9v_fsZB6A&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=11',
		'https://www.youtube.com/watch?v=IV-8YsyghbU&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=4&pp=iAQB',
		'https://www.youtube.com/watch?v=MLKrmw906TM&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=5&pp=iAQB',
		'https://www.youtube.com/watch?v=kXhJ3hHK9hQ&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=7&pp=iAQB',
		'https://www.youtube.com/watch?v=5C-s4JrymKM&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=6&pp=iAQB',
		'https://www.youtube.com/watch?v=gs_gY1K1AMU&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=12&pp=iAQB',
		'https://www.youtube.com/watch?v=YaDvRdLMkHs&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=16&pp=iAQB',
		'https://www.youtube.com/watch?v=mjQwedC1WzI&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=17&pp=iAQB',
		'https://www.youtube.com/watch?v=vCGtkDzELAI&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=24&pp=iAQB',
		'https://www.youtube.com/watch?v=G30m6XDBTh4&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=26&pp=iAQB',
		'https://www.youtube.com/watch?v=FOoffXFpAlU&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=30',
		'https://www.youtube.com/watch?v=wRHBwxC8b8I&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=31&pp=iAQB',
		'https://www.youtube.com/watch?v=8bIys6JoEDw&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=33&pp=iAQB',
		'https://www.youtube.com/watch?v=-a739VjqdSI&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=34&pp=iAQB',
		'https://www.youtube.com/watch?v=PrvtOWEXDIQ&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=36',
		'https://www.youtube.com/watch?v=2Co6pNvd9mc&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=35',
		'https://www.youtube.com/watch?v=r_UfYY7aWKo&list=PL5jiSeCBcSKcAT7i3zWX95XMDlD9BLB03&index=32'
		]

# website that converts 
download_url = "https://y2mate.nu/Pio1/"

cnt = 0
for url in urls:
	# go to the website that converts Youtube videos to mp3
	driver.get(download_url)
	
	# fill in the Youtube url we want to download
	url_field = driver.find_element("id", "url")
	url_field.send_keys(url)

	# locate the convert button and click it
	convert = driver.find_element(By.XPATH, '//input[@type="submit" and @value="Convert"]')
	convert.click()

	# wait for the website to convert video to mp3
	wait = WebDriverWait(driver, 20)

	# locate the element that holds the download button
	download_next = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'div[style="justify-content: center;')))
	# Get the two <a> elements inside the 'download_next' <div>
	links = download_next.find_elements(By.TAG_NAME, 'a')
	# Choose the first <a> element which is the download button
	download_link = links[0]
	download_link.click()

	# waiting for the download to finish
	time.sleep(60)

	cnt += 1
	print("Download #", cnt, "is complete!")

print("================All downloads were completed successfully==================\n")

# Close the browser
driver.quit()