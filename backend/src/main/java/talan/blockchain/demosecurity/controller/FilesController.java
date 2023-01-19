package talan.blockchain.demosecurity.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import talan.blockchain.demosecurity.service.interfaces.FilesStorageService;


@RestController
@CrossOrigin("*")

public class FilesController {

   private final FilesStorageService filesStorageService ;

    public FilesController(FilesStorageService filesStorageService) {
        this.filesStorageService = filesStorageService;
    }

   @PostMapping("/upload")
    String uploadFile(@RequestParam("file") MultipartFile file) {
       String message = "";
       try {
           filesStorageService.save(file);

           message = "Uploaded the file successfully: " + file.getOriginalFilename();
           return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
       } catch (Exception e) {
           message = "Could not upload the file: " + file.getOriginalFilename() + ". Error: " + e.getMessage();
           return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
       }
   }

}
