Set objFSO = CreateObject("Scripting.FileSystemObject")
objStartFolder = "..\img"

Set objFolder = objFSO.GetFolder(objStartFolder)

Set colFiles = objFolder.Files
concatStr = ""
counter = 0
index = 0
For Each objFile in colFiles
	
	index = Instr(objFile.Name, ".")

	fileName = Mid(objFile.Name, 1, abs(index-1))
	
	arr = split(fileName, "_")

	comment = ""
	for each x in arr 
		comment = comment + " " + 	x
	next

	counter = counter + 1
	
	concatStr = concatStr +  "{ " + chr(34) + "imgPath" + chr(34) + " : " + chr(34) + "img"  + chr(47) + objFile.Name + chr(34) + " , " 

	concatStr = concatStr + chr(34) + "id" + chr(34) + " : " + chr(34) + CStr(counter) + chr(34) + " ," 
	concatStr= concatStr + chr(34) + "comment" + chr(34) + " : " + chr(34) + comment + chr(34) + " }," 

	concatStr    = concatStr + vbCRLF
Next

Wscript.Echo concatStr