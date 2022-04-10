package com.app.payload;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangePassPayload {
//	@NotNull private String uId;
	@NotNull @Size(min = 6, max = 15) private String newPass;
	

}
